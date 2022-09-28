import { TaskList } from '../components/TaskList.component';
import { TaskEdit } from '../components/TaskEdit.component';

export const routes = {
  '/': ($outlet) => {
    const component = new TaskList();
    component.render($outlet);
  },
  '/add': ($outlet) => {
    const component = new TaskEdit();
    component.render($outlet);
  },
  '/edit/:id': ($outlet, params) => {
    const component = new TaskEdit(params.id);
    component.render($outlet);
  },
};
