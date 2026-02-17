

## Dynamic Pricing Configurator - Replace Zakeke

### The Problem
Zakeke paywalled dynamic pricing, so customization costs don't reflect in Shopify checkout. We'll build a custom configurator with add-on pricing (base price + extras).

### User Flow

1. Customer picks base options (size, material, orientation) -- sets the base price
2. Customer uploads their artwork
3. Customer adds extras (text, premium effects, extra colors) -- each adds to the price
4. Price updates live on screen
5. Customer clicks "Add to Cart" -- backend creates a Shopify Draft Order with the exact calculated price
6. Customer is redirected to Shopify checkout with the correct total

### Architecture

```text
+---------------------------+
|   Lovable Frontend        |
|   (Konfigurator Page)     |
|                           |
|  [Size] [Material] [Fmt]  |
|  [Image Upload]           |
|  [Add Text] [Effects]     |
|  [Live Price Display]     |
|                           |
|  --> "Add to Cart"        |
+-----------+---------------+
            |
            v
+-----------+---------------+
|   Edge Function           |
|   "create-custom-order"   |
|                           |
|  - Validates selections   |
|  - Calculates final price |
|  - Calls Shopify Admin    |
|    API: Draft Order       |
|  - Returns checkout URL   |
+-----------+---------------+
            |
            v
+-----------+---------------+
|   Shopify Checkout        |
|   (Draft Order Invoice)   |
|   Correct price shown     |
+---------------------------+
```

### What Gets Built

**1. Database: Pricing Rules Table** ✅ DONE

A `pricing_rules` table so you can update pricing without code changes.

| Column | Example |
|--------|---------|
| category | `base_size`, `addon_text`, `addon_effect` |
| option_key | `S`, `M`, `premium_text`, `gold_effect` |
| price_eur | `89.00`, `15.00`, `25.00` |

**2. File Storage** ✅ DONE

A storage bucket for customer design uploads. Images are stored and referenced in the Draft Order notes so you know what to print.

**3. Edge Function: `create-custom-order`** ✅ DONE

- Receives full configuration (size, material, orientation, add-ons, uploaded image URL)
- Fetches pricing rules from database
- Calculates final price server-side (base + all add-ons) to prevent tampering
- Calls Shopify Admin API to create a Draft Order with:
  - Correct total price
  - Line item description listing all customizations
  - Customer's uploaded design reference
- Returns the Draft Order invoice URL as the checkout link

**4. Updated Konfigurator Page** ✅ DONE

- Keep existing size/material/orientation selectors
- Add image upload area (stored in backend file storage)
- Add text customization panel (add text, choose font)
- Add effects/extras toggles (premium finish, gold accents, etc.)
- Live price calculator summing base + selected add-ons
- "Add to Cart" button calls the edge function and redirects to checkout

### Steps

1. ✅ Create the `pricing_rules` database table with base prices and add-on definitions
2. ✅ Set up file storage bucket for customer design uploads
3. ✅ Build the `create-custom-order` edge function (price calculation + Shopify Draft Order creation)
4. ✅ Update the Konfigurator page UI (upload, text, effects, live pricing)
5. ✅ Connect the "Add to Cart" flow to the edge function
6. Test the full flow end-to-end

### What You'll Need to Provide

- **Shopify Admin API token** -- needed for creating Draft Orders (we'll prompt you securely)
- **Your add-on options and prices** -- what extras to offer and at what cost (we can start with placeholders you adjust later)
