# msc-ez-catalog

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/msc-ez-catalog) [![DeepScan grade](https://deepscan.io/api/teams/16372/projects/26551/branches/847170/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=16372&pid=26551&bid=847170)

Book reading is a very common UI effect to provide different browsing experience for users. With &lt;msc-ez-catalog />, developers could adopt this feature to web page easier. All developers need to do is just providing series image paths in config and everything will be all set.

![msc-ez-catalog](https://github.com/meistudioli/msc-ez-catalog/assets/10822546/6412ea26-06f9-48e0-b65b-2c1d23da7cf8)

## Basic Usage

&lt;msc-ez-catalog /> is a web component. All we need to do is put the required script into your HTML document. Then follow &lt;msc-ez-catalog />'s html structure and everything will be all set.

- Required Script

```html
<script
  type="module"
  src="https://your-domain/wc-msc-ez-catalog.js">        
</script>
```

- Structure

Put &lt;msc-ez-catalog /> into HTML document. It will have different functions and looks with attribute mutation.

```html
<msc-ez-catalog>
  <script type="application/json">
    {
      "pages": [
        "your_image_path_0.jpg",
        "your_image_path_1.jpg",
        "your_image_path_2.jpg",
        "your_image_path_3.jpg",
        ...
      ]
    }
  </script>
</msc-ez-catalog>
```

## JavaScript Instantiation

&lt;msc-ez-catalog /> could also use JavaScript to create DOM element. Here comes some examples.

```html
<script type="module">
import { MscEzCatalog } from 'https://your-domain/wc-msc-ez-catalog.js';

const pages = [
  "your_image_path_0.jpg",
  "your_image_path_1.jpg",
  "your_image_path_2.jpg",
  "your_image_path_3.jpg"
];

// use DOM api
const nodeA = document.createElement('msc-ez-catalog');
document.body.appendChild(nodeA);
nodeA.pages = pages;

// new instance with Class
const nodeB = new MscEzCatalog();
document.body.appendChild(nodeB);
nodeB.pages = pages;

// new instance with Class & default config
const nodeC = new MscEzCatalog({ pages });
document.body.appendChild(nodeC);
</script>
```

## Style Customization

Developers could apply styles to decorate &lt;msc-ez-catalog />'s looking.

```html
<style>
msc-ez-catalog {
  --msc-ez-cataloag-duration: 750ms;
  --msc-ez-cataloag-border-radius: 8px;
}
</style>
```

## Attributes

&lt;msc-ez-catalog /> supports some attributes to let it become more convenience & useful.

- **pages**

Set pages' image path for &lt;msc-ez-catalog />. Once setting, &lt;msc-ez-catalog /> will re-render all pages.（pages should be array and has more than `4` children）

```html
<msc-ez-catalog
  pages='["your_image_path_0.jpg","your_image_path_1.jpg","your_image_path_2.jpg","your_image_path_3.jpg"]'
>
  ...
</msc-ez-catalog>
```

## Keyboard shortcuts

| Key | Description |
| ----------- | ----------- |
| ← | Go to previous flip. |
| → | Go to next flip. |
| f | Toggle fullscreen.（same as double click &lt;msc-ez-catalog />） |

## Methods

| Method Signature | Description |
| ----------- | ----------- |
| prev() | Go to previous flip. |
| next() | Go to next flip. |
| seekTo(index = 1) | Switch to flip index. index will be correct to flip count once more than flip count. |

## Property

| Property Name | Type | Description |
| ----------- | ----------- | ----------- |
| pages | Array | Getter / Setter for pages' image path. |
| currentflip | Number | Getter for current flip. |
| flipcount | Number | Getter for flipcount. |

## Event

| Event Signature | Description |
| ----------- | ----------- |
| msc-ez-catalog-flip | Fired when flip occured. Developers can gather pages' information through `event.detail`. |

## Reference
- [&lt;msc-ez-catalog /> demo](https://blog.lalacube.com/mei/webComponent_msc-ez-catalog.html)
- [WEBCOMPONENTS.ORG](https://www.webcomponents.org/element/msc-ez-catalog)
- [YouTube](https://youtu.be/IWm-iK5LwX4)




