<template>
    <ais-pagination>
        <v-layout d-flex class="paginator"
            slot-scope="{
            currentRefinement,
            nbPages,
            pages,
            isFirstPage,
            isLastPage,
            refine,
            createURL
            }"
        >
            <v-btn class="paginator__btn" v-if="!isFirstPage" :href="createURL(0)" @click.prevent="refine(0)">
                ‹‹
            </v-btn>
            <v-btn class="paginator__btn" v-if="!isFirstPage" 
                  :href="createURL(currentRefinement - 1)"
                  @click.prevent="refine(currentRefinement - 1)">
                ‹
            </v-btn>
            <v-btn class="paginator__btn"
                v-for="page in pages" :key="page"
                :href="createURL(page)"
                :style="{ fontWeight: page === currentRefinement ? 'bold' : '' }"
                @click.prevent="refine(page)"
            >
            <a
                
            >
                {{ page + 1 }}
            </a>
            </v-btn>
            <v-btn class="paginator__btn" v-if="!isLastPage"
                :href="createURL(currentRefinement + 1)"
                @click.prevent="refine(currentRefinement + 1)"
            >
            ›
            </v-btn>
            <v-btn class="paginator__btn" v-if="!isLastPage" :href="createURL(nbPages)" @click.prevent="refine(nbPages)">
                ››
            </v-btn>
        </v-layout>
    </ais-pagination>
</template>

<style scoped>
.paginator{
    display:flex;
    flex-direction:row;
    justify-content:center;
    margin:0 auto;
}

.paginator__btn{
    margin: 0 0.5em 0.5em 0;
}
    
</style>