<template>
    <Layout style="padding-top:100px">
        <h1>Hey {{$context.name }}</h1>
    </Layout>

</template>
<script>
export default {
    name:"Doc",
    metaInfo:'hello World',
    meta:[
        {name:"author", content:"John Doe"}
    ]
}
</script>