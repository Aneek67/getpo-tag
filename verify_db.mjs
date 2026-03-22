import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://zeugqkbjglpsoqwspqbe.supabase.co', 'sb_publishable_jgCNhfx3OOYyD6TrgY1Dkw_oIluiYoI');

async function test() {
  const { data } = await supabase.from('items').select('id, title, subtitle');
  console.log(JSON.stringify(data, null, 2));
}

test();
