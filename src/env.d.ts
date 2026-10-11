/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_PAYPAL_CLIENT_ID?: string;
  readonly PUBLIC_WEB3FORMS_CHECKOUT_KEY?: string;
  readonly PUBLIC_WEB3FORMS_CONTACT_KEY?: string;
  readonly PUBLIC_GTM_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
