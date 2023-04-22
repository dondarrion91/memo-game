import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import PanelComponent from "../PanelComponent/PanelComponent.vue";

describe("PanelComponent", () => {
  it("renders properly", () => {
    const wrapper = mount(PanelComponent, { props: { header: "El Titulo de la tarjeta" } });
    expect(wrapper.text()).toContain("El Titulo de la tarjeta");
  });
});
