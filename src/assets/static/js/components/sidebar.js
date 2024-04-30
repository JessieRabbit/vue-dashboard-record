import isDesktop from '../helper/isDesktop';

/**
 * a Sidebar component
 * @param  {HTMLElement} el - sidebar element
 * @param  {object} options={} - options
 */
class Sidebar {
  constructor(el, options = {}) {
    this.sidebarEL = el instanceof HTMLElement ? el : document.querySelector(el);
    this.options = options;
    this.init();
  }

  /**
   * On Sidebar Rezise Event
   */
  onResize() {
    if (isDesktop(window)) {
      this.sidebarEL.classList.add('active');
      this.sidebarEL.classList.remove('inactive');
    } else {
      this.sidebarEL.classList.remove('active');
    }

    // reset
    this.deleteBackdrop();
    this.toggleOverflowBody(true);
  }

  /**
   * initialize the sidebar
   */
  init() {
    // add event listener to sidebar
    document
      .querySelectorAll('.burger-btn')
      .forEach((el) => el.addEventListener('click', this.toggle.bind(this)));
    document
      .querySelectorAll('.sidebar-hide')
      .forEach((el) => el.addEventListener('click', this.toggle.bind(this)));
    window.addEventListener('resize', this.onResize.bind(this));
  }

  createBackdrop() {
    if (isDesktop(window)) return;
    this.deleteBackdrop();
    const backdrop = document.createElement('div');
    backdrop.classList.add('sidebar-backdrop');
    backdrop.addEventListener('click', this.hide.bind(this));
    document.body.appendChild(backdrop);
  }

  /**
   * Delete Sidebar Backdrop
   */
  deleteBackdrop() {
    const backdrop = document.querySelector('.sidebar-backdrop');
    this.backdrop = backdrop;
    if (backdrop) {
      backdrop.remove();
    }
  }

  /**
   * Toggle Overflow Body
   */
  toggleOverflowBody(active) {
    if (isDesktop(window)) return;
    const sidebarState = this.sidebarEL.classList.contains('active');
    const body = document.querySelector('body');
    if (typeof active === 'undefined') {
      body.style.overflowY = sidebarState ? 'hidden' : 'auto';
    } else {
      body.style.overflowY = active ? 'auto' : 'hidden';
    }
  }

  /**
   * Show Sidebar
   */
  show() {
    this.sidebarEL.classList.add('active');
    this.sidebarEL.classList.remove('inactive');
    this.createBackdrop();
    this.toggleOverflowBody();
  }

  /**
   * Hide Sidebar
   */
  hide() {
    console.log('2');
    this.sidebarEL.classList.remove('active');
    this.sidebarEL.classList.add('inactive');
    this.deleteBackdrop();
    this.toggleOverflowBody();
  }

  /**
   * Toggle Sidebar
   */
  toggle() {
    const sidebarState = this.sidebarEL.classList.contains('active');
    if (sidebarState) {
      console.log('1');
      this.hide();
    } else {
      this.show();
    }
  }
}

const sidebarEl = document.getElementById('sidebar');

/**
  * On First Load
  */
const onFirstLoadGlobal = function onFirstLoad(sidebarEL) {
  if (!sidebarEl) return;
  if (isDesktop(window)) {
    sidebarEL.classList.add('active');
    sidebarEL.classList.add('sidebar-desktop');
  }

  // Get submenus size
  const submenus = document.querySelectorAll('.sidebar-item.has-sub .submenu');
  for (let i = 0; i < submenus.length; i += 1) {
    const submenu = submenus[i];
    const sidebarItem = submenu.parentElement;

    if (sidebarItem.classList.contains('active')) submenu.classList.add('submenu-open');
    else submenu.classList.add('submenu-closed');
  }
};

/**
 * Create Sidebar Wrapper
 */
// NOTE make Sidebar method as a global function
window.Sidebar = Sidebar;

export default onFirstLoadGlobal;
