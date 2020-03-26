<template>
  <div>
    <h2>{{ summaryTitle }}</h2>
    <img :src="summaryImage" width="100px"/>
    <div v-html="summaryText"></div>
  </div>
</template>

<script>
  export default {
    name: "DesignDetail",
    data: function () {
      return {
        rawTitle: 'medical-shields-for-3d-printing',
        summaryText: '<div data-v-112252f1=""><h1>Título: Del diseño a la impresión masiva en 3D de Medical Shields en tres días</h1>\n' +
          '<h3>Referencia:</h3>\n' +
          '<p>Toda la información compilada aquí se puede encontrar <a href="https://blog.prusaprinters.org/from-design-to-mass-3d-printing-of-medical-shields-in-three-days/" target="_blank" rel="noreferrer noopener">en este enlace</a></p>\n' +
          '<h3>Consideraciones generales antes de comenzar</h3>\n' +
          '<h4>Preocupaciones sobre respiradores impresos</h4>\n' +
          '<ul>\n' +
          '<li>Ninguno de los diseños disponibles en este momento se ha probado para garantizar que brinden las protecciones necesarias, al menos ninguno de los que conozco. Para ayudar con esto, hemos recopilado tantos diseños como pudimos encontrar, y estamos trabajando con expertos para ver si podemos verificar cuáles funcionan realmente. ¿Cuáles son los puntos clave de enfoque? Primero, es el sellado, luego el filtro en sí, el filtro de la máscara y cómo la máscara se adhiere a la cara, todo debe ser perfecto. La mayoría de nosotros imprimimos materiales rígidos que son difíciles de hacer compatibles con los sellos. (por Prusa)</li>\n' +
          '<li>Otra pregunta que debemos tener en cuenta es la porosidad de las piezas impresas y las preocupaciones de seguridad que surgen de eso. El usuario tendrá la máscara en la cara, un lugar húmedo y cálido, un caldo de cultivo perfecto para los gérmenes. No podremos esterilizar estas máscaras de manera efectiva, por lo que podríamos estar causando aún más problemas. Y el virus supuestamente sobrevive más de 48 horas en los plásticos (o incluso 90 horas, según algunos otros estudios). Todos queremos ayudar a nuestros amigos y familiares, lo que significa que debemos ser más precavidos para evitar lastimarlos. Si insiste absolutamente en imprimir una máscara ahora, trátela como si fuera una máscara quirúrgica básica y no como un verdadero respirador con todas las protecciones que proporcionan. Una falsa sensación de seguridad puede ser muy peligrosa. Entiendo que estás tratando de ayudar, pero POR FAVOR, difunde esta información en tus grupos de impresión 3D.</li>\n' +
          '</ul>\n' +
          '</div>',
        summaryImage: '/resources/image/example-summary-image.jpg'
      }
    },
    computed: {
      summaryTitle: function () {

        return this.titleCase(this.spaceDashes(this.rawTitle))
      }
    }
  }
</script>

<style scoped>
</style>
