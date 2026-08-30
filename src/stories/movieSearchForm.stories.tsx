// Draft 5 Add a story 
import type { Meta, StoryObj } from "@storybook/react";
import MovieSearchForm from "../components/movieSearchForm";

const meta: Meta<typeof MovieSearchForm> = {
  title: "MovieSearchForm",
  component: MovieSearchForm,
};

export default meta;
type Story = StoryObj<typeof MovieSearchForm>;

export const Default: Story = {
  args: {
    onSearch: (year, cert) => console.log(year, cert),
  },
};
