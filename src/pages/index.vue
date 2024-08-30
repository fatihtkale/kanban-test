<template>
  <v-app-bar :elevation="2">
    <v-app-bar-title>Kanban Board</v-app-bar-title>
  </v-app-bar>
  <v-col class="overflow-x-auto">
    <v-row class="d-flex flex-row overflow-x-auto">
      <draggable v-model="kanbanSections" group="people" item-key="id" @start="drag = true" @end="drag = false"
        class="d-flex flex-row">
        <template #item="{ element }">
          <v-col class="d-flex flex-row">
            <KanbanSection @edit-section="editSection" :section="element" />
          </v-col>
        </template>
      </draggable>
    </v-row>
  </v-col>
  <teleport to="body">
    <v-fab location="bottom end" absolute icon="$plus" @click="addNewSection"></v-fab>
  </teleport>
  <v-dialog :attach="true" id="section-modal" v-model="dialog" max-width="600">
    <v-card class="modal-title" title="Rediger sektion">
      <v-card-text>
        <v-row dense>
          <v-col md="100%">
            <v-text-field class="modal-section-title" v-model="modalValues.title" label="Opgave navn" required></v-text-field>
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
import KanbanSection from '../components/KanbanSection.vue'
import SectionInterface from '../interface/SectionInterface'
import draggable from 'vuedraggable'

const kanbanSections = ref<SectionInterface[]>([])
const drag = ref(false)
const dialog = ref(false)
const modalValues = ref<SectionInterface>({
  title: '',
  cards: [],
  id: ''
})

const addNewSection = () => {
  kanbanSections.value.push({
    title: 'Ny sektion',
    cards: [],
    id: Math.random().toString(36).substr(2, 9)
  })
}

const editSection = (section: SectionInterface) => {
  dialog.value = true
  modalValues.value = { ...section }
}

const confirmEdit = () => {
  const index = kanbanSections.value.findIndex(section => section.id === modalValues.value.id)

  kanbanSections.value[index].title = modalValues.value.title

  dialog.value = false
}
</script>
