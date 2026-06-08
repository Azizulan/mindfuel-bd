import type { CollectionConfig } from 'payload';

export const Media: CollectionConfig = {
  slug: 'media',
  access: { read: () => true },
  admin: { group: 'Catalogue' },
  upload: {
    staticDir: 'public/uploads',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumbnail', width: 200, height: 200, position: 'centre' },
      { name: 'card', width: 600, height: 600, position: 'centre' },
    ],
  },
  fields: [
    { name: 'alt', type: 'text', label: 'Alt text (for accessibility & SEO)' },
  ],
};
