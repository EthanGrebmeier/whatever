

const defaultApplets = {
  name: 'Default',
  id: 456,
  applets: [
    {
      id: 'checklist'+ Math.floor(Math.random() * 800 + 100),
      name: 'Checklist',
      width: '49%',
      height: '49%',
      position: 'top left',
      background: '#77BA99'
    },
    {
      id: 'patchnotes'+ Math.floor(Math.random() * 800 + 100),
      name: 'Patch Notes',
      width: '49%',
      height: '100%',
      position: 'top right',
      background: '#FFC590',
    }
  ]
}

export default defaultApplets