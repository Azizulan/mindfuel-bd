/**
 * Pass-through root layout.
 *
 * The actual <html>/<body> live in the route-group layouts:
 *   - (frontend)/layout.tsx  → the storefront
 *   - (payload)/layout.tsx   → the Payload admin
 *
 * Each group renders its own document shell, so this root must not.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
