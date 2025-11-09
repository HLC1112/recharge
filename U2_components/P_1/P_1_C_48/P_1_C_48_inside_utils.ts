import { computed } from 'vue';

import { IProps } from './P_1_C_48_inside_Obj';



export function useDrawer(props: IProps) {

  const drawerClasses = computed(() => {

    const classes = ['drawer-container'];

    // Based on CL_25 (Drawer), we might add classes for direction

    classes.push(`drawer--${props.direction || 'rtl'}`);

    return classes;

  });



  return { drawerClasses };

}