<template>
    <v-list>
        <v-list-item v-for="(design, i) in designs" :key="i">
            <section :class="`hero is-large is-${design.color}`">
                <div class="hero-body has-title-centered">
                    <h1 class="title">{{design.title}}</h1>
                </div>
            </section>
        </v-list-item>           
    </v-list>
</template>

<script>
export default {
    data(){
        return {
            designs: [
                { title: 'Design 1', color: 'primary', summary: 'Design 1 summary' },
                { title: 'Design 2', color: 'info', summary: 'Design 2 summary' },
                { title: 'Design 3', color: 'success', summary: 'Design 3 summary' },
                { title: 'Design 4', color: 'warning', summary: 'Design 4 summary' },
                { title: 'Design 5', color: 'danger', summary: 'Design 5 summary' }
            ]
        }
    }
}
</script>

<style lang="sass" scoped>
    
</style>
