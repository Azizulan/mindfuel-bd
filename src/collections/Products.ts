import type { CollectionConfig } from 'payload';

/** Bilingual EN/BN pair as a Payload group. Matches the storefront's { en, bn } shape. */
const bilingual = (name: string, label: string, textarea = false) => ({
  name,
  type: 'group' as const,
  label,
  fields: [
    { name: 'en', type: (textarea ? 'textarea' : 'text') as 'text', label: 'English' },
    { name: 'bn', type: (textarea ? 'textarea' : 'text') as 'text', label: 'বাংলা (Bengali)' },
  ],
});

export const Products: CollectionConfig = {
  slug: 'products',
  admin: {
    useAsTitle: 'adminTitle',
    defaultColumns: ['adminTitle', 'category', 'flavorGroup', 'rating'],
    group: 'Catalogue',
  },
  access: { read: () => true },
  fields: [
    // A readable title for the admin list (kept in sync from name.en)
    {
      name: 'adminTitle',
      type: 'text',
      admin: { hidden: true },
      hooks: {
        beforeChange: [
          ({ siblingData }) => (siblingData?.name?.en as string) || 'Untitled product',
        ],
      },
    },

    {
      type: 'tabs',
      tabs: [
        /* ---------- Basics ---------- */
        {
          label: 'Basics',
          fields: [
            { name: 'slug', type: 'text', required: true, unique: true, admin: { description: 'URL path, e.g. chocolate-peanut-butter' } },
            bilingual('name', 'Product name'),
            {
              name: 'category',
              type: 'select',
              required: true,
              options: [
                { label: 'Peanut Butter', value: 'peanut-butter' },
                { label: 'Granola', value: 'granola' },
                { label: 'Muesli', value: 'muesli' },
                { label: 'Nuts', value: 'nuts' },
                { label: 'Seeds', value: 'seeds' },
                { label: 'Functional Drink', value: 'functional-drink' },
                { label: 'Bundle', value: 'bundle' },
              ],
            },
            bilingual('tagline', 'Tagline (short value prop)', true),
            bilingual('shortDescription', 'Short description', true),
            bilingual('longDescription', 'Long description', true),
            { name: 'rating', type: 'number', defaultValue: 4.8, min: 0, max: 5 },
            { name: 'reviewCount', type: 'number', defaultValue: 0 },
          ],
        },

        /* ---------- Flavour ---------- */
        {
          label: 'Flavour',
          description: 'Group sibling flavours so they show as swatches on the product page.',
          fields: [
            { name: 'flavorGroup', type: 'text', admin: { description: 'Same value across all flavours in a line, e.g. "peanut-butter". Leave blank if this product has no flavour variants.' } },
            bilingual('flavorName', 'Flavour name (e.g. Smooth, Chocolate, Lemon)'),
            {
              name: 'flavorColor',
              type: 'text',
              label: 'Swatch colour (hex)',
              admin: { description: 'The colour of this flavour\'s swatch, e.g. #5A3A24', placeholder: '#5A3A24' },
            },
          ],
        },

        /* ---------- Sizes / pricing ---------- */
        {
          label: 'Sizes & Pricing',
          fields: [
            {
              name: 'variants',
              type: 'array',
              label: 'Sizes',
              minRows: 1,
              admin: { description: 'Each jar/pack size with its own price & stock.' },
              fields: [
                { name: 'sku', type: 'text', required: true },
                bilingual('label', 'Size label (e.g. 250g Jar)'),
                { name: 'size', type: 'text', required: true, admin: { placeholder: '250g' } },
                { name: 'price', type: 'number', required: true, admin: { description: 'Selling price in ৳' } },
                { name: 'comparePrice', type: 'number', admin: { description: 'Strikethrough / original price in ৳ (optional)' } },
                { name: 'inStock', type: 'checkbox', defaultValue: true },
              ],
            },
          ],
        },

        /* ---------- Images ---------- */
        {
          label: 'Images',
          fields: [
            { name: 'heroImage', type: 'text', label: 'Main image URL', admin: { description: 'Paste an image URL, or upload via Media and paste its URL here.' } },
            { name: 'galleryImages', type: 'array', label: 'Gallery image URLs', fields: [{ name: 'url', type: 'text' }] },
          ],
        },

        /* ---------- Badges & tags ---------- */
        {
          label: 'Badges & Tags',
          fields: [
            {
              name: 'badges',
              type: 'array',
              label: 'Badges (e.g. Best Seller, Summer Hero)',
              fields: [
                { name: 'label', type: 'text', required: true },
                {
                  name: 'color',
                  type: 'select',
                  defaultValue: 'amber',
                  options: [
                    { label: 'Amber (yellow)', value: 'amber' },
                    { label: 'Mint (blue)', value: 'mint' },
                    { label: 'Cobalt (brown)', value: 'cobalt' },
                    { label: 'Danger (red)', value: 'danger' },
                  ],
                },
              ],
            },
            {
              name: 'seasonalTags',
              type: 'select',
              hasMany: true,
              options: [
                { label: 'Summer', value: 'summer' },
                { label: 'Monsoon', value: 'monsoon' },
                { label: 'Winter', value: 'winter' },
                { label: 'Ramadan', value: 'ramadan' },
                { label: 'Always on', value: 'always-on' },
              ],
            },
            { name: 'crossSellSlugs', type: 'array', label: 'Cross-sell product slugs', fields: [{ name: 'slug', type: 'text' }] },
            { name: 'allergens', type: 'array', label: 'Allergens', fields: [{ name: 'name', type: 'text' }] },
          ],
        },

        /* ---------- Detailed content ---------- */
        {
          label: 'Details',
          description: 'Benefits, FAQs, nutrition & comparison row.',
          fields: [
            {
              name: 'keyBenefits',
              type: 'array',
              fields: [
                { name: 'icon', type: 'text', admin: { description: 'leaf, flask, zap, ban, factory, shield, droplets, grain, fruit' } },
                bilingual('label', 'Benefit'),
              ],
            },
            {
              name: 'faqs',
              type: 'array',
              fields: [
                bilingual('question', 'Question'),
                bilingual('answer', 'Answer', true),
              ],
            },
            {
              name: 'ingredients',
              type: 'group',
              fields: [
                { name: 'en', type: 'array', label: 'English', fields: [{ name: 'item', type: 'text' }] },
                { name: 'bn', type: 'array', label: 'Bengali', fields: [{ name: 'item', type: 'text' }] },
              ],
            },
            {
              name: 'nutritionFacts',
              type: 'group',
              fields: [
                { name: 'servingSize', type: 'text' },
                { name: 'calories', type: 'number' },
                { name: 'protein', type: 'number' },
                { name: 'carbs', type: 'number' },
                { name: 'fat', type: 'number' },
                { name: 'fiber', type: 'number' },
                { name: 'sugar', type: 'number' },
                { name: 'sodium', type: 'number' },
              ],
            },
            {
              name: 'comparisonRow',
              type: 'group',
              admin: { description: 'Values for the "real vs fake" comparison table.' },
              fields: [
                { name: 'protein', type: 'text' },
                { name: 'addedSugar', type: 'checkbox' },
                { name: 'palmOil', type: 'checkbox' },
                { name: 'preservatives', type: 'checkbox' },
                { name: 'labTested', type: 'checkbox', defaultValue: true },
                { name: 'pricePerGram', type: 'text' },
              ],
            },
          ],
        },
      ],
    },
  ],
};
