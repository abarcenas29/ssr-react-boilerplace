import { configure } from '@storybook/react'

function loadStories () {
  require('./../src/Components')
}

configure(loadStories, module)
