import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://lpoaampixotovyzomqqp.supabase.co"
const supabaseKey = "sb_publishable_tM198LKh5GTLpGNTqRW7Uw_9dM81vzY"

export const supabase = createClient(supabaseUrl, supabaseKey)