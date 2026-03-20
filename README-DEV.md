# Revealr — Developer & Testing Guide

## 1. Stripe Test Mode

Revealr usa Stripe Checkout. Para desarrollo usa siempre las **claves de test**.

### Obtener claves de test

1. Ve a [dashboard.stripe.com](https://dashboard.stripe.com) → asegúrate de que el toggle **"Test mode"** está activo (arriba a la derecha)
2. Ve a **Developers → API keys**
3. Copia:
   - `Publishable key` → `pk_test_...`
   - `Secret key` → `sk_test_...`

### Configurar en local

En tu `.env.local`:

```env
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXXXX
```

### Tarjeta de prueba

En Stripe test mode usa estos datos en el checkout:

| Campo     | Valor                |
|-----------|----------------------|
| Número    | `4242 4242 4242 4242` |
| Expiración | cualquier fecha futura (ej. `12/29`) |
| CVC       | cualquier 3 dígitos  |
| ZIP       | cualquier código     |

Con esta tarjeta el pago se completa correctamente y Revealr muestra el reporte completo.

Otras tarjetas de prueba: [stripe.com/docs/testing](https://stripe.com/docs/testing)

---

## 2. Admin / Dev Bypass (sin pagar)

Para ver el reporte completo **sin usar Stripe en absoluto**, activa el bypass.

### En desarrollo local

En `NODE_ENV !== production` (es decir, al correr `npm run dev`), el bypass ya está disponible. Solo necesitas añadir tu email a la whitelist o no poner whitelist:

```env
# .env.local
REVEALR_DEV_BYPASS=true

# Opcional: limitar a emails concretos
DEV_BYPASS_EMAILS=tu@email.com,otro@email.com
```

Reinicia el servidor tras cambiar `.env.local`.

### Comportamiento con bypass activo

1. Subes un archivo en la homepage
2. El dashboard corre el análisis normalmente (IA real, no mock)
3. En vez de mostrar la pantalla de pago, pasa directamente al reporte completo
4. Verás una etiqueta amarilla: **"Dev mode · Payment bypass active"**

La etiqueta es solo visual para ti — no aparece en producción sin el flag.

### En producción / staging (admin)

Si necesitas bypass en un entorno de producción (ej. demo, QA):

```env
# En Vercel → Settings → Environment Variables
REVEALR_DEV_BYPASS=true
DEV_BYPASS_EMAILS=admin@tudominio.com
```

**Importante:** cuando termines el testing, elimina `REVEALR_DEV_BYPASS` de Vercel y redespliega.

---

## 3. Seguridad — por qué esto no rompe producción

| Protección | Detalle |
|------------|---------|
| **Server-only** | `lib/bypass.ts` y `/api/check-bypass` corren exclusivamente en el servidor. El cliente nunca ve la lógica ni las variables de entorno. |
| **Doble gate** | Bypass solo activo si `NODE_ENV !== production` **O** `REVEALR_DEV_BYPASS=true` existe explícitamente. En Vercel Production sin el flag, siempre devuelve `{ bypassed: false }`. |
| **Whitelist de emails** | Con `DEV_BYPASS_EMAILS`, solo esos emails son bypasados. Un usuario normal nunca pasa el check. |
| **El cliente solo recibe un booleano** | `/api/check-bypass` devuelve `{ bypassed: true/false }` — nada más. El cliente no sabe si hay whitelist, qué emails están permitidos, ni qué entorno corre. |
| **Stripe no se modifica** | El flujo de Stripe real no cambia. Si el bypass está inactivo, todo fluye hacia Stripe exactamente igual. |
| **Sin flag en prod → imposible** | Sin `REVEALR_DEV_BYPASS=true` en las env vars de Vercel, es matemáticamente imposible activar el bypass en producción, independientemente de lo que el usuario envíe al endpoint. |

---

## 4. Variables de entorno — resumen

| Variable | Obligatoria | Descripción |
|----------|-------------|-------------|
| `ANTHROPIC_API_KEY` | Sí | Clave de la API de Claude |
| `STRIPE_SECRET_KEY` | Sí | Clave secreta de Stripe (test o live) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Sí | Clave pública de Stripe |
| `STRIPE_WEBHOOK_SECRET` | Para webhooks | Secret del webhook de Stripe |
| `RESEND_API_KEY` | Sí | Clave de Resend para emails |
| `NEXT_PUBLIC_APP_URL` | Sí | URL base de la app (sin trailing slash) |
| `BLOB_READ_WRITE_TOKEN` | En producción | Token de Vercel Blob para almacenamiento |
| `REVEALR_DEV_BYPASS` | No | `true` para activar bypass de pago |
| `DEV_BYPASS_EMAILS` | No | Emails permitidos (separados por coma) |
