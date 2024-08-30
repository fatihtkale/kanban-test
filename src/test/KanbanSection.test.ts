/*
* @vitest-environment happy-dom
*/

import { afterEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";

import SectionComponent from "../components/KanbanSection.vue";
import KanbanSection from "@/interface/SectionInterface";


import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe("KanbanSection tests", () => {
    let wrapper;
    
    afterEach(() => {
        wrapper.unmount()
    });

    it("Adds a new section and check if title is there", () => {

        const newSection: KanbanSection = {
            title: "im new title",
            cards: [],
            id: "KKRIOL32",
        };

        wrapper = mount(SectionComponent, {
            props: { section: newSection },
            global: {
                plugins: [vuetify]
            }
        });

        expect(wrapper.find('.section-title span').text()).include(newSection.title);
    });
});