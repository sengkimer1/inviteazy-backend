console.log('val')

import { z } from 'zod';

const nameSchema = z.string();
nameSchema.parse("John"); // ✅
nameSchema.parse(42);     // ❌ throws ZodError