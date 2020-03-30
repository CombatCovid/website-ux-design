<template>
    <Layout style="padding-top:200px;">
        <h1>{{$context.name}}</h1>
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