# Try With Seasons

A script that renders a Seasons widget on third-party brand partner site product pages to prompt users to try the product on Seasons.

## Usage

Include the script within the third-party site HTML:

```html 
<script type="text/javascript">
  const script = document.createElement('script')
  script.onload = () => {
    TryWithSeasons.render({
        containerElement: document.getElementById("try-with-seasons"),
        type: TryWithSeasons.WidgetType.CTA_DARK,
    });
  }
  script.src = "https://wearseasons.com/try-with-seasons.js"
  document.head.appendChild(script)
</script>
```

A variety of widget types are available for rendering: [WidgetType](./types.ts)

Optionally, an object of type `ProductDetails` may be passed to `TryWithSeasons.render`. If it is not included, product details are resolved according to the structured data included within the HTML.

If product details can not be resolved, or if the corresponding product can not be found on Seasons or is not currently available, nothing is rendered

