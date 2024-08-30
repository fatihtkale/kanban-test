<template>
    <v-card width="auto" color="primary">
        <v-col class="d-flex align-center justify-space-between">
            <div>
                <span class="font-weight-black">{{ card?.title }}</span>
            </div>
            <div>
                <v-btn @click="$emit('updateCard', card)" >
                    <v-icon icon="$edit"></v-icon>
                </v-btn>
            </div>
        </v-col>
        <v-card-text class="bg-surface-light pt-4">
            <span>{{ card?.desc }}</span>
        </v-card-text>
    </v-card>
</template>

<script lang="ts" setup>
import CardInterface from '@/interface/CardInterface';

const emits = defineEmits(['updateCard']);
const props = defineProps({card: Object as PropType<CardInterface>})

const card = computed(() => props.card);
</script>