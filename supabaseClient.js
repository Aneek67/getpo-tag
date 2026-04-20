import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// MOCK FALLBACK: If keys are missing, provide a local-storage based mock client
function createMockClient() {
    console.warn("⚠️ Supabase credentials missing. Using LocalStorage fallback mode.");
    
    return {
        auth: {
            getSession: async () => ({ data: { session: JSON.parse(localStorage.getItem('staff_session')) }, error: null }),
            signInWithPassword: async () => ({ data: { user: {} }, error: null }),
            signOut: async () => { localStorage.removeItem('staff_session'); return { error: null }; }
        },
        from: (table) => ({
            select: (columns, options) => {
                let data = JSON.parse(localStorage.getItem(`mock_${table}`)) || [];
                
                // Initialize mock data if empty
                if (data.length === 0) {
                    if (table === 'events') {
                        data = [
                            { id: 'ev1', title: 'Midnight Comic Con', date: '2024-08-15', location: 'Mumbai, India', description: 'Experience the largest gathering of comic creators and fans in the country.', link: 'https://example.com/tickets', image_url: 'https://via.placeholder.com/600x400?text=Comic+Con' },
                            { id: 'ev2', title: 'Artist Showcase: Neon Noir', date: '2024-09-10', location: 'Bengaluru, India', description: 'Join us for an exclusive gallery night featuring the latest original art from Getpo Tag artists.', link: null, image_url: 'https://via.placeholder.com/600x400?text=Artist+Showcase' }
                        ];
                        localStorage.setItem(`mock_events`, JSON.stringify(data));
                    }
                }
                const result = {
                    data: options?.head ? null : data,
                    count: data.length,
                    error: null
                };

                // Make it awaitable and supports chaining
                const chain = {
                    ...result,
                    then: (fn) => Promise.resolve(fn(result)),
                    order: () => Promise.resolve(result),
                    eq: (key, val) => {
                        const filtered = data.filter(item => item[key] === val);
                        const eqResult = { data: filtered, count: filtered.length, error: null };
                        return {
                            ...eqResult,
                            then: (fn) => Promise.resolve(fn(eqResult)),
                            single: () => Promise.resolve({ data: filtered[0] || null, error: null })
                        };
                    }
                };
                return chain;
            },
            insert: async (newData) => {
                const data = JSON.parse(localStorage.getItem(`mock_${table}`)) || [];
                const updated = [...data, ...newData.map(item => ({ ...item, id: Math.random().toString(36).substr(2, 9), created_at: new Date().toISOString() }))];
                localStorage.setItem(`mock_${table}`, JSON.stringify(updated));
                return { error: null };
            },
            delete: () => ({
                eq: (key, val) => {
                    const data = JSON.parse(localStorage.getItem(`mock_${table}`)) || [];
                    const filtered = data.filter(item => item[key] !== val);
                    localStorage.setItem(`mock_${table}`, JSON.stringify(filtered));
                    return { error: null };
                }
            }),
            update: (updates) => ({
                eq: (key, val) => {
                    const data = JSON.parse(localStorage.getItem(`mock_${table}`)) || [];
                    const updated = data.map(item => item[key] === val ? { ...item, ...updates } : item);
                    localStorage.setItem(`mock_${table}`, JSON.stringify(updated));
                    return { error: null };
                }
            })
        }),
        storage: {
            from: () => ({
                upload: async (name) => ({ data: { path: name }, error: null }),
                getPublicUrl: (name) => ({ data: { publicUrl: 'https://via.placeholder.com/300x450?text=Mock+Image' } })
            })
        }
    };
}

export const supabase = (supabaseUrl && supabaseAnonKey) 
    ? createClient(supabaseUrl, supabaseAnonKey) 
    : createMockClient();

