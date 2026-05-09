import { supabase } from './supabaseClient.js';

export let activeOffer = null;

export async function initOfferBanner() {
    try {
        const { data: offers, error } = await supabase
            .from('offers')
            .select('*')
            .eq('active', true)
            .limit(1);

        if (!error && offers && offers.length > 0) {
            activeOffer = offers[0];
            
            // Create banner
            const banner = document.createElement('div');
            banner.id = 'promo-banner';
            banner.className = 'w-full bg-primary text-white py-2 px-4 text-center font-bold text-xs uppercase tracking-widest z-[100] fixed top-0 left-0 flex items-center justify-center gap-2 shadow-lg';
            
            let text = `${activeOffer.title}`;
            if (activeOffer.discount_percentage) {
                text += ` - ${activeOffer.discount_percentage}% OFF!`;
            }
            if (activeOffer.description) {
                text += ` | ${activeOffer.description}`;
            }
            
            banner.innerHTML = `<span class="material-symbols-outlined text-[14px]">local_offer</span> <span>${text}</span>`;
            
            document.body.appendChild(banner);
            
            // Adjust layouts for banner
            const adjustLayout = () => {
                const bannerHeight = banner.offsetHeight;
                const headers = document.querySelectorAll('header.fixed');
                headers.forEach(h => {
                    h.style.top = bannerHeight + 'px';
                });
                
                // Adjust body padding so scrolling works
                // Only if it's not the hero image overlapping
                if (document.getElementById('main-header')) {
                    const header = document.getElementById('main-header');
                    header.style.marginTop = bannerHeight + 'px';
                    header.style.top = '0';
                }
            };
            
            // slight delay to ensure rendering
            setTimeout(adjustLayout, 50);
            window.addEventListener('resize', adjustLayout);
        }
    } catch (e) {
        console.error("Failed to load offers", e);
    }
}

export function formatPriceWithOffer(price) {
    const inr = price * 83;
    if (activeOffer && activeOffer.discount_percentage) {
        const discounted = inr * (1 - (activeOffer.discount_percentage / 100));
        return `<span class="line-through text-zinc-400 text-[0.8em] font-normal mr-1">₹${inr.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span><span class="text-error font-black">₹${discounted.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>`;
    }
    return `₹${inr.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
}
