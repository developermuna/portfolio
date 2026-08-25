import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

export interface Project {
  number: string; // Used as ID for now
  name: string;
  category: string;
  description: string;
  image: string;
  url?: string;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  buyUrl?: string;
  viewUrl?: string;
  Price?: number;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
  link?: string;
  description?: string;
}

export const useSupabaseData = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  const sortByStringNum = (a: any, b: any) => {
    const numA = parseInt((a.number || a.id || '').replace(/\D/g, ''), 10) || 0;
    const numB = parseInt((b.number || b.id || '').replace(/\D/g, ''), 10) || 0;
    return numA - numB;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectsRes, productsRes, certsRes] = await Promise.all([
          supabase.from('projects').select('*'),
          supabase.from('products').select('*'),
          supabase.from('certifications').select('*')
        ]);

        if (projectsRes.data) setProjects(projectsRes.data.sort(sortByStringNum));
        if (productsRes.data) setProducts(productsRes.data.sort(sortByStringNum));
        if (certsRes.data) setCertifications(certsRes.data.sort(sortByStringNum));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    const channelId = Math.random().toString(36).substring(7);

    // Subscribe to realtime changes
    const projectsChannel = supabase
      .channel(`public:projects:${channelId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'projects' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setProjects(prev => [...prev, payload.new as Project].sort(sortByStringNum));
        } else if (payload.eventType === 'UPDATE') {
          setProjects(prev => prev.map(p => p.number === (payload.new as Project).number ? (payload.new as Project) : p).sort(sortByStringNum));
        } else if (payload.eventType === 'DELETE') {
          setProjects(prev => prev.filter(p => p.number !== payload.old.number));
        }
      })
      .subscribe();

    const productsChannel = supabase
      .channel(`public:products:${channelId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setProducts(prev => [...prev, payload.new as Product].sort(sortByStringNum));
        } else if (payload.eventType === 'UPDATE') {
          setProducts(prev => prev.map(p => p.id === (payload.new as Product).id ? (payload.new as Product) : p).sort(sortByStringNum));
        } else if (payload.eventType === 'DELETE') {
          setProducts(prev => prev.filter(p => p.id !== payload.old.id));
        }
      })
      .subscribe();

    const certsChannel = supabase
      .channel(`public:certifications:${channelId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'certifications' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setCertifications(prev => [...prev, payload.new as Certification].sort(sortByStringNum));
        } else if (payload.eventType === 'UPDATE') {
          setCertifications(prev => prev.map(c => c.id === (payload.new as Certification).id ? (payload.new as Certification) : c).sort(sortByStringNum));
        } else if (payload.eventType === 'DELETE') {
          setCertifications(prev => prev.filter(c => c.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(projectsChannel);
      supabase.removeChannel(productsChannel);
      supabase.removeChannel(certsChannel);
    };
  }, []);

  return { projects, products, certifications, loading };
};
