import { supabase } from '../supabaseclient.js';

export async function checkAuth() {
    // 1. Check for special local staff session first (fallback for broken Supabase project)
    const localSession = localStorage.getItem('staff_session');
    if (localSession) {
        return JSON.parse(localSession);
    }

    const { data: { session } } = await supabase.auth.getSession();
    
    // Redirect to login if no session
    if (!session && !window.location.pathname.includes('login.html')) {
        window.location.href = 'login.html';
        return null;
    }

    if (session) {
        // Fetch User Profile Role
        const { data: profile, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

        if (error) {
            console.error('Error fetching profile:', error);
            return { session, profile: null };
        }

        return { session, profile };
    }

    return null;
}

export async function signOut() {
    localStorage.removeItem('staff_session');
    await supabase.auth.signOut();
    window.location.href = 'login.html';
}
