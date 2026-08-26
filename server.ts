import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { initialData } from "./src/data/initialData";
import { AppStateData, ClientOrder, ContactMessage, OrderMessage, OrderAttachment } from "./src/types";

const app = express();
const PORT = 3000;

// Body parsing with support for large JSON (base64 image uploads)
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

// Persistent JSON Storage setup
const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "portfolio-db.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadDatabase(): AppStateData {
  try {
    if (fs.existsSync(DB_FILE)) {
      const content = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Error reading portfolio-db.json, fallback to initialData:", err);
  }
  // Initialize with initialData
  saveDatabase(initialData);
  return initialData;
}

function saveDatabase(data: AppStateData) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing to portfolio-db.json:", err);
  }
}

// In-memory data store with disk synchronization
let db: AppStateData = loadDatabase();

// Admin credentials (configurable)
let ADMIN_CREDENTIALS = {
  email: "admin@portfolio.dev",
  password: "admin123"
};

// -------------------------------------------------------------
// PUBLIC API ENDPOINTS
// -------------------------------------------------------------

// 1. Get all public portfolio content
app.get("/api/portfolio-data", (req, res) => {
  res.json({
    success: true,
    profile: db.profile,
    seo: db.seo,
    services: db.services,
    skills: db.skills,
    projects: db.projects,
    pricing: db.pricing,
    testimonials: db.testimonials
  });
});

// 2. Submit a new client order
app.post("/api/orders", (req, res) => {
  try {
    const body = req.body;
    if (!body.clientName || !body.clientEmail || !body.projectType) {
      return res.status(400).json({ success: false, error: "Missing required client or project information" });
    }

    const randomNum = Math.floor(10000 + Math.random() * 90000);
    const trackingCode = `ORD-${randomNum}`;
    const newId = `ord-${Date.now()}`;

    const newOrder: ClientOrder = {
      id: newId,
      trackingCode,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "New",
      clientName: body.clientName,
      clientEmail: body.clientEmail,
      clientPhone: body.clientPhone || "",
      clientCountry: body.clientCountry || "United States",
      clientCompany: body.clientCompany || "",
      projectType: body.projectType,
      websiteType: body.websiteType || body.projectType,
      pageCount: body.pageCount || "1-3 Pages",
      requiredFeatures: Array.isArray(body.requiredFeatures) ? body.requiredFeatures : [],
      preferredTechnology: body.preferredTechnology || "React / Next.js",
      designPreference: body.designPreference || "Modern & Clean",
      existingWebsiteUrl: body.existingWebsiteUrl || "",
      referenceWebsites: body.referenceWebsites || "",
      projectDescription: body.projectDescription || "",
      additionalRequirements: body.additionalRequirements || "",
      selectedPackage: body.selectedPackage || "",
      customBudget: body.customBudget || "",
      currency: body.currency || "$",
      timeline: body.timeline || "2 Weeks",
      agreedPrice: body.agreedPrice || (body.selectedPackage ? 950 : undefined),
      deadline: body.deadline || "",
      attachments: Array.isArray(body.attachments) ? body.attachments : [],
      milestones: [
        {
          id: `m-${Date.now()}-1`,
          title: "Project Scope & Requirement Review",
          description: "Analyzing specifications, reference sites, and finalizing timeline.",
          status: "in-progress"
        },
        {
          id: `m-${Date.now()}-2`,
          title: "Wireframes & UI Concept Approval",
          description: "Interactive mockups and design direction sign-off.",
          status: "pending"
        },
        {
          id: `m-${Date.now()}-3`,
          title: "Core Web Development & Functionality",
          description: "Building responsive frontend, components, and backend logic.",
          status: "pending"
        },
        {
          id: `m-${Date.now()}-4`,
          title: "Testing, SEO & Final Production Launch",
          description: "Speed audit, mobile QA, and domain DNS setup.",
          status: "pending"
        }
      ],
      messages: [
        {
          id: `msg-${Date.now()}-init`,
          sender: "admin",
          senderName: db.profile.name || "Alex Rivera",
          content: `Hello ${body.clientName}! Thank you for submitting your project request for "${body.projectType}". I have received your specifications and will review the scope to propose our development kickoff. Feel free to send any additional notes or assets here.`,
          timestamp: new Date().toISOString()
        }
      ],
      paymentStatus: "Pending Deposit"
    };

    db.orders.unshift(newOrder);
    saveDatabase(db);

    res.status(201).json({
      success: true,
      message: "Your project request has been received successfully. I will review your requirements and contact you soon.",
      order: newOrder,
      trackingCode
    });
  } catch (error: any) {
    console.error("Order submission error:", error);
    res.status(500).json({ success: false, error: error.message || "Failed to process order" });
  }
});

// 3. Track client order (by tracking code or email)
app.get("/api/orders/track/:identifier", (req, res) => {
  const { identifier } = req.params;
  const cleaned = identifier.trim().toLowerCase();

  const order = db.orders.find(
    o => o.trackingCode.toLowerCase() === cleaned || o.clientEmail.toLowerCase() === cleaned || o.id === cleaned
  );

  if (!order) {
    return res.status(404).json({ success: false, error: "No project order found matching this tracking code or email address." });
  }

  // Also return any other orders associated with this email for the client portal
  const allClientOrders = db.orders.filter(o => o.clientEmail.toLowerCase() === order.clientEmail.toLowerCase());

  res.json({
    success: true,
    order,
    allOrders: allClientOrders
  });
});

// 4. Client / Admin message in an order
app.post("/api/orders/:id/messages", (req, res) => {
  const { id } = req.params;
  const { sender, senderName, content, attachments } = req.body;

  const order = db.orders.find(o => o.id === id || o.trackingCode === id);
  if (!order) {
    return res.status(404).json({ success: false, error: "Order not found" });
  }

  const newMessage: OrderMessage = {
    id: `msg-${Date.now()}`,
    sender: sender === "admin" ? "admin" : "client",
    senderName: senderName || (sender === "admin" ? db.profile.name : order.clientName),
    content: content || "",
    timestamp: new Date().toISOString(),
    attachments: attachments || []
  };

  order.messages.push(newMessage);
  order.updatedAt = new Date().toISOString();
  saveDatabase(db);

  res.json({ success: true, message: newMessage, order });
});

// 5. Upload attachment to order
app.post("/api/orders/:id/attachments", (req, res) => {
  const { id } = req.params;
  const { attachment } = req.body;

  const order = db.orders.find(o => o.id === id || o.trackingCode === id);
  if (!order) {
    return res.status(404).json({ success: false, error: "Order not found" });
  }

  const newAtt: OrderAttachment = {
    id: `att-${Date.now()}`,
    name: attachment.name,
    size: attachment.size || 0,
    type: attachment.type || "file",
    dataUrl: attachment.dataUrl,
    uploadedAt: new Date().toISOString()
  };

  order.attachments.push(newAtt);
  order.updatedAt = new Date().toISOString();
  saveDatabase(db);

  res.json({ success: true, attachment: newAtt, order });
});

// 6. Submit Contact Inquiry
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Please fill in all required fields." });
  }

  const newContact: ContactMessage = {
    id: `cmsg-${Date.now()}`,
    name,
    email,
    subject: subject || "Portfolio Inbound Inquiry",
    message,
    createdAt: new Date().toISOString(),
    read: false,
    replied: false
  };

  db.messages.unshift(newContact);
  saveDatabase(db);

  res.json({ success: true, message: "Thank you! Your message has been sent successfully. I will get back to you within 24 hours." });
});

// -------------------------------------------------------------
// ADMIN AUTH & MANAGEMENT ENDPOINTS
// -------------------------------------------------------------

app.post("/api/auth/admin-login", (req, res) => {
  const { email, password } = req.body;
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    // Generate a simple secure token for demo
    const token = `adm_token_${Date.now()}_${Math.random().toString(36).substring(2)}`;
    return res.json({
      success: true,
      token,
      admin: {
        email: ADMIN_CREDENTIALS.email,
        name: db.profile.name
      }
    });
  }
  res.status(401).json({ success: false, error: "Invalid admin credentials. Use admin@portfolio.dev / admin123 for demo access." });
});

// Get full admin dataset
app.get("/api/admin/data", (req, res) => {
  res.json({
    success: true,
    data: db
  });
});

// Update Profile & Stats
app.put("/api/admin/profile", (req, res) => {
  db.profile = { ...db.profile, ...req.body };
  saveDatabase(db);
  res.json({ success: true, profile: db.profile });
});

// Update SEO
app.put("/api/admin/seo", (req, res) => {
  db.seo = { ...db.seo, ...req.body };
  saveDatabase(db);
  res.json({ success: true, seo: db.seo });
});

// Projects CRUD
app.post("/api/admin/projects", (req, res) => {
  const newProject = {
    id: `proj-${Date.now()}`,
    ...req.body
  };
  db.projects.unshift(newProject);
  db.profile.projectsCompleted = db.projects.length;
  saveDatabase(db);
  res.json({ success: true, project: newProject });
});

app.put("/api/admin/projects/:id", (req, res) => {
  const { id } = req.params;
  const index = db.projects.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ success: false, error: "Project not found" });
  
  db.projects[index] = { ...db.projects[index], ...req.body };
  saveDatabase(db);
  res.json({ success: true, project: db.projects[index] });
});

app.delete("/api/admin/projects/:id", (req, res) => {
  const { id } = req.params;
  db.projects = db.projects.filter(p => p.id !== id);
  db.profile.projectsCompleted = db.projects.length;
  saveDatabase(db);
  res.json({ success: true, message: "Project deleted" });
});

// Services CRUD
app.post("/api/admin/services", (req, res) => {
  const newService = {
    id: `srv-${Date.now()}`,
    ...req.body
  };
  db.services.push(newService);
  saveDatabase(db);
  res.json({ success: true, service: newService });
});

app.put("/api/admin/services/:id", (req, res) => {
  const { id } = req.params;
  const index = db.services.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ success: false, error: "Service not found" });
  
  db.services[index] = { ...db.services[index], ...req.body };
  saveDatabase(db);
  res.json({ success: true, service: db.services[index] });
});

app.delete("/api/admin/services/:id", (req, res) => {
  const { id } = req.params;
  db.services = db.services.filter(s => s.id !== id);
  saveDatabase(db);
  res.json({ success: true, message: "Service deleted" });
});

// Pricing CRUD
app.post("/api/admin/pricing", (req, res) => {
  const newPricing = {
    id: `pkg-${Date.now()}`,
    ...req.body
  };
  db.pricing.push(newPricing);
  saveDatabase(db);
  res.json({ success: true, pricing: newPricing });
});

app.put("/api/admin/pricing/:id", (req, res) => {
  const { id } = req.params;
  const index = db.pricing.findIndex(p => p.id === id);
  if (index === -1) return res.status(404).json({ success: false, error: "Package not found" });
  
  db.pricing[index] = { ...db.pricing[index], ...req.body };
  saveDatabase(db);
  res.json({ success: true, pricing: db.pricing[index] });
});

app.delete("/api/admin/pricing/:id", (req, res) => {
  const { id } = req.params;
  db.pricing = db.pricing.filter(p => p.id !== id);
  saveDatabase(db);
  res.json({ success: true, message: "Package deleted" });
});

// Skills CRUD
app.post("/api/admin/skills", (req, res) => {
  const newSkill = {
    id: `sk-${Date.now()}`,
    ...req.body
  };
  db.skills.push(newSkill);
  db.profile.technologiesCount = db.skills.length;
  saveDatabase(db);
  res.json({ success: true, skill: newSkill });
});

app.put("/api/admin/skills/:id", (req, res) => {
  const { id } = req.params;
  const index = db.skills.findIndex(s => s.id === id);
  if (index === -1) return res.status(404).json({ success: false, error: "Skill not found" });
  
  db.skills[index] = { ...db.skills[index], ...req.body };
  saveDatabase(db);
  res.json({ success: true, skill: db.skills[index] });
});

app.delete("/api/admin/skills/:id", (req, res) => {
  const { id } = req.params;
  db.skills = db.skills.filter(s => s.id !== id);
  db.profile.technologiesCount = db.skills.length;
  saveDatabase(db);
  res.json({ success: true, message: "Skill deleted" });
});

// Testimonials CRUD
app.post("/api/admin/testimonials", (req, res) => {
  const newTestimonial = {
    id: `test-${Date.now()}`,
    ...req.body
  };
  db.testimonials.unshift(newTestimonial);
  db.profile.happyClients = Math.max(db.profile.happyClients, db.testimonials.length + 50);
  saveDatabase(db);
  res.json({ success: true, testimonial: newTestimonial });
});

app.put("/api/admin/testimonials/:id", (req, res) => {
  const { id } = req.params;
  const index = db.testimonials.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ success: false, error: "Testimonial not found" });
  
  db.testimonials[index] = { ...db.testimonials[index], ...req.body };
  saveDatabase(db);
  res.json({ success: true, testimonial: db.testimonials[index] });
});

app.delete("/api/admin/testimonials/:id", (req, res) => {
  const { id } = req.params;
  db.testimonials = db.testimonials.filter(t => t.id !== id);
  saveDatabase(db);
  res.json({ success: true, message: "Testimonial deleted" });
});

// Update Order (Status, Price, Notes, Milestones, Payment)
app.put("/api/admin/orders/:id", (req, res) => {
  const { id } = req.params;
  const index = db.orders.findIndex(o => o.id === id);
  if (index === -1) return res.status(404).json({ success: false, error: "Order not found" });

  db.orders[index] = {
    ...db.orders[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  saveDatabase(db);
  res.json({ success: true, order: db.orders[index] });
});

// Update Message read/replied
app.put("/api/admin/messages/:id", (req, res) => {
  const { id } = req.params;
  const msg = db.messages.find(m => m.id === id);
  if (!msg) return res.status(404).json({ success: false, error: "Message not found" });

  if (typeof req.body.read === "boolean") msg.read = req.body.read;
  if (typeof req.body.replied === "boolean") msg.replied = req.body.replied;
  saveDatabase(db);
  res.json({ success: true, message: msg });
});

// Reset demo data endpoint
app.post("/api/admin/reset-demo", (req, res) => {
  db = JSON.parse(JSON.stringify(initialData));
  saveDatabase(db);
  res.json({ success: true, message: "Database reset to initial demo state" });
});

// -------------------------------------------------------------
// SEO & ROBOTS & SITEMAP GENERATION
// -------------------------------------------------------------

app.get("/sitemap.xml", (req, res) => {
  const baseUrl = db.seo.canonicalUrl || "https://riveradev.com";
  const now = new Date().toISOString().split("T")[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  // Core routes
  const routes = ["", "about", "services", "skills", "projects", "pricing", "testimonials", "contact", "start-a-project"];
  routes.forEach(route => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/${route ? `#${route}` : ""}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>${route === "" ? "1.0" : "0.8"}</priority>\n`;
    xml += `  </url>\n`;
  });

  // Dynamic projects
  db.projects.forEach(p => {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/#project-${p.slug || p.id}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += `</urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(xml);
});

app.get("/robots.txt", (req, res) => {
  const baseUrl = db.seo.canonicalUrl || "https://riveradev.com";
  const txt = `User-agent: *\nAllow: /\nDisallow: /admin\n\nSitemap: ${baseUrl}/sitemap.xml\n`;
  res.header("Content-Type", "text/plain");
  res.send(txt);
});

// -------------------------------------------------------------
// VITE / STATIC SERVING
// -------------------------------------------------------------

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Portfolio & Order Management Server running on port ${PORT}`);
  });
}

startServer();
