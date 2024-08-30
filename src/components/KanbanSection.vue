<template>
    <v-card width="456" class="overflow-auto">
        <v-container>
            <v-row class="d-flex justify-space-between align-center mx-2 my-1">
                <div class="section-title">
                    <span style="color: white;">{{ sections?.title }}</span>
                </div>
                <div>
                    <v-btn id="button-section-edit" @click="emits('edit-section', sections)" color="primary">
                        <v-icon icon="$edit"></v-icon>
                    </v-btn>
                </div>
            </v-row>
            <v-col>
                <v-col>
                    <draggable class="list-group d-flex flex-column ga-5" :list="sections?.cards" group="section" :itemKey="sections?.id">
                        <template #item="{ element }">
                            <div>
                                <KanbanCard :card="element" @update-card="cardEdit" />
                            </div>
                        </template>
                    </draggable>
                </v-col>
                <v-col class="d-flex flex-column">
                    <v-btn @click="addNewCard" elevation="4" width="100%" color="primary" class="d-flex mt">Tilføj ny opgave</v-btn>
                </v-col>
            </v-col>
        </v-container>
    </v-card>
    <v-dialog v-model="dialog" max-width="600">
        <v-card title="Rediger opgave">
            <v-card-text>
                <v-row dense>
                    <v-col md="100%">
                        <v-text-field class="modal-card-title" v-model="modalValues!.title" label="Opgave navn" required></v-text-field>
                    </v-col>
                </v-row>
                <v-row dense>
                    <v-col md="100%">
                        <v-textarea class="modal-card-desc" v-model="modalValues!.desc" label="Beskrivelse"></v-textarea>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text="ANNULLER" variant="plain" @click="dialog = false"></v-btn>
                <v-btn color="primary" text="GEM" variant="tonal" @click="confirmEdit"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts" setup>
import CardInterface from '@/interface/CardInterface';
import KanbanCard from './KanbanCard.vue';
import KanbanSection from '@/interface/SectionInterface';
import draggable from 'vuedraggable'

const props = defineProps({
    section: Object as PropType<KanbanSection>,
})
const emits = defineEmits(['edit-section']);

const dialog = ref(false);
const sections = computed(() => props.section);
const modalValues = ref<CardInterface>();

const addNewCard = () => {
    props.section?.cards.push({
        id: Math.random().toString(36).substr(2, 9),
        title: 'Ny opgave',
        desc: 'Beskrivelse af opgave',
    })
}

const cardEdit = (card: CardInterface) => {
    dialog.value = true;
    modalValues.value = { ...card };
}

const confirmEdit = () => {
    if (sections.value && modalValues.value) {
        const index = sections.value.cards.findIndex(card => card.id === modalValues?.value?.id);

        if (index !== -1) {
            sections.value.cards[index] = modalValues.value;
        }
    }

    dialog.value = false;
}
</script>