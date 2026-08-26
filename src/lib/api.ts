import { AppStateData, ClientOrder, ContactMessage, OrderAttachment, OrderMessage, Project, Service, Skill, PricingPackage, Testimonial, SiteProfile, SeoSettings } from '../types';
import { initialData } from '../data/initialData';

const BASE_URL = '';

export async function fetchPortfolioData(): Promise<AppStateData> {
  try {
    const res = await fetch(`${BASE_URL}/api/portfolio-data`);
    if (!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();
    return {
      profile: data.profile || initialData.profile,
      seo: data.seo || initialData.seo,
      services: data.services || initialData.services,
      skills: data.skills || initialData.skills,
      projects: data.projects || initialData.projects,
      pricing: data.pricing || initialData.pricing,
      testimonials: data.testimonials || initialData.testimonials,
      orders: [],
      messages: []
    };
  } catch (err) {
    console.warn('API unavailable, using fallback data:', err);
    return initialData;
  }
}

export async function submitOrder(orderData: Partial<ClientOrder>): Promise<{ success: boolean; message?: string; order?: ClientOrder; trackingCode?: string; error?: string }> {
  try {
    const res = await fetch(`${BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });
    return await res.json();
  } catch (err: any) {
    console.error('Order submission error:', err);
    return { success: false, error: err.message || 'Network error occurred while submitting order' };
  }
}

export async function trackOrder(identifier: string): Promise<{ success: boolean; order?: ClientOrder; allOrders?: ClientOrder[]; error?: string }> {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/track/${encodeURIComponent(identifier)}`);
    return await res.json();
  } catch (err: any) {
    return { success: false, error: 'Could not connect to tracking server.' };
  }
}

export async function sendOrderMessage(orderId: string, payload: { sender: 'client' | 'admin'; senderName: string; content: string; attachments?: OrderAttachment[] }) {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/${encodeURIComponent(orderId)}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function uploadOrderAttachment(orderId: string, attachment: { name: string; size: number; type: string; dataUrl: string }) {
  try {
    const res = await fetch(`${BASE_URL}/api/orders/${encodeURIComponent(orderId)}/attachments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attachment })
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function submitContactMessage(payload: { name: string; email: string; subject: string; message: string }) {
  try {
    const res = await fetch(`${BASE_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

// Admin API
export async function adminLogin(credentials: { email: string; password: string }) {
  try {
    const res = await fetch(`${BASE_URL}/api/auth/admin-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function fetchAdminData(): Promise<{ success: boolean; data?: AppStateData; error?: string }> {
  try {
    const res = await fetch(`${BASE_URL}/api/admin/data`);
    return await res.json();
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function updateAdminProfile(profile: Partial<SiteProfile>) {
  const res = await fetch(`${BASE_URL}/api/admin/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile)
  });
  return await res.json();
}

export async function updateAdminSeo(seo: Partial<SeoSettings>) {
  const res = await fetch(`${BASE_URL}/api/admin/seo`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(seo)
  });
  return await res.json();
}

export async function saveAdminProject(project: Partial<Project>, isNew = false) {
  const url = isNew ? `${BASE_URL}/api/admin/projects` : `${BASE_URL}/api/admin/projects/${project.id}`;
  const method = isNew ? 'POST' : 'PUT';
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(project)
  });
  return await res.json();
}

export async function deleteAdminProject(id: string) {
  const res = await fetch(`${BASE_URL}/api/admin/projects/${id}`, { method: 'DELETE' });
  return await res.json();
}

export async function saveAdminService(service: Partial<Service>, isNew = false) {
  const url = isNew ? `${BASE_URL}/api/admin/services` : `${BASE_URL}/api/admin/services/${service.id}`;
  const method = isNew ? 'POST' : 'PUT';
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(service)
  });
  return await res.json();
}

export async function deleteAdminService(id: string) {
  const res = await fetch(`${BASE_URL}/api/admin/services/${id}`, { method: 'DELETE' });
  return await res.json();
}

export async function saveAdminPricing(pkg: Partial<PricingPackage>, isNew = false) {
  const url = isNew ? `${BASE_URL}/api/admin/pricing` : `${BASE_URL}/api/admin/pricing/${pkg.id}`;
  const method = isNew ? 'POST' : 'PUT';
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pkg)
  });
  return await res.json();
}

export async function deleteAdminPricing(id: string) {
  const res = await fetch(`${BASE_URL}/api/admin/pricing/${id}`, { method: 'DELETE' });
  return await res.json();
}

export async function saveAdminSkill(skill: Partial<Skill>, isNew = false) {
  const url = isNew ? `${BASE_URL}/api/admin/skills` : `${BASE_URL}/api/admin/skills/${skill.id}`;
  const method = isNew ? 'POST' : 'PUT';
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(skill)
  });
  return await res.json();
}

export async function deleteAdminSkill(id: string) {
  const res = await fetch(`${BASE_URL}/api/admin/skills/${id}`, { method: 'DELETE' });
  return await res.json();
}

export async function saveAdminTestimonial(testimonial: Partial<Testimonial>, isNew = false) {
  const url = isNew ? `${BASE_URL}/api/admin/testimonials` : `${BASE_URL}/api/admin/testimonials/${testimonial.id}`;
  const method = isNew ? 'POST' : 'PUT';
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(testimonial)
  });
  return await res.json();
}

export async function deleteAdminTestimonial(id: string) {
  const res = await fetch(`${BASE_URL}/api/admin/testimonials/${id}`, { method: 'DELETE' });
  return await res.json();
}

export async function updateAdminOrder(id: string, updates: Partial<ClientOrder>) {
  const res = await fetch(`${BASE_URL}/api/admin/orders/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  return await res.json();
}

export async function updateAdminMessageStatus(id: string, updates: { read?: boolean; replied?: boolean }) {
  const res = await fetch(`${BASE_URL}/api/admin/messages/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  return await res.json();
}

export async function resetDemoDatabase() {
  const res = await fetch(`${BASE_URL}/api/admin/reset-demo`, { method: 'POST' });
  return await res.json();
}
