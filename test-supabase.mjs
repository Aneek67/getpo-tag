import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zeugqkbjglpsoqwspqbe.supabase.co'
const supabaseAnonKey = 'sb_publishable_jgCNhfx3OOYyD6TrgY1Dkw_oIluiYoI'
const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testInsert() {
    console.log("Testing Supabase insert...");
    
    const orderId = 'GLY-TEST-' + Math.floor(1000 + Math.random() * 9000);
    const itemId = 'd75d1603-da70-4b23-a190-4dc300901d9c';

    const { data, error } = await supabase
        .from('orders')
        .insert([
            {
                order_id: orderId,
                curator_name: 'Robot Tester',
                block_number: '99',
                flat_number: '999',
                status: 'pending',
                item_id: itemId
            }
        ])
        .select();

    if (error) {
        console.error('Error placing order:', error);
    } else {
        console.log('Order placed successfully via anon key! Data:', data);
    }
}

testInsert();
