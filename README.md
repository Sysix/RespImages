RespImages
==========

###Verwenden:

```javascript
<script src="respimages.js" async></script>
```

```javascript
$('#responsive img').RespImages();
```

#### Parameter

```javascript
.RespImages({
data: 'data-src',
toSrc: true
});
```

`data`: HTML Attribute des Bildpfades
`toSrc`: Solls das src attribute ersetzt werden, oder das `data`-Attribute

#### Bildgrößen Festlegen

```javascript
.RespImages({}, [400, 600, 800, 1000, 1200]);
```

### Imagemanagertypen

- resp
- resp400
- resp600
- resp800
- resp1000
- resp1200

