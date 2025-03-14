<script>
  import { menuItems } from "../menu.js";
  let menuOpen = false;
  let activeMenu = null;

  function toggleMenu() {
    menuOpen = !menuOpen;
  }

  function toggleSubMenu(index) {
    activeMenu = activeMenu === index ? null : index;
  }
</script>

<header class="row">
  <div class="col-md-4">
    <div class="header-left clearfix">
      <div class="site-name-and-slogan smooth-scroll">
        <a href="https://www.softscripts.net/">
          <img width="152" height="80" id="logo" src="images/logo.png" alt="Softscript Solutions" />
        </a>
      </div>
    </div>
  </div>

  <div class="col-md-8">
    <div class="header-right clearfix">
      <div class="main-navigation animated">
        <nav class="navbar navbar-default" role="navigation">
          <div class="container-fluid">
            <!-- Toggle Button for Mobile -->
            <button class="navbar-toggle" aria-expanded={menuOpen} on:click={toggleMenu}>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>

            <!-- Navigation Links -->
            <div class:collapse={!menuOpen} class="collapse navbar-collapse">
              <nav aria-label="Main Menu" tabindex="0">
                <ul role="menubar" class="nav navbar-nav navbar-right">
                  {#each menuItems as item, index}
                    <li role="none" class="menu-item">
                      <a role="menuitem" tabindex="0" href={item.link} on:click={() => item.submenu && toggleSubMenu(index)}>
                        {item.name}
                        {#if item.submenu}
                          <span class="submenu-icon">▼</span>
                        {/if}
                      </a>
                      {#if item.submenu && activeMenu === index}
                        <ul class="submenu">
                          {#each item.submenu as sub}
                            <li><a href={sub.link}>{sub.name}</a></li>
                          {/each}
                        </ul>
                      {/if}
                    </li>
                  {/each}
                </ul>
              </nav>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</header>

<style>
  .navbar-toggle {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  .navbar-toggle .icon-bar {
    display: block;
    width: 22px;
    height: 2px;
    background-color: black;
    margin: 4px 0;
  }
  .collapse {
    display: none;
  }
  .collapse.navbar-collapse {
    display: block;
  }
  .submenu {
    list-style: none;
    padding: 0;
    margin: 0;
    background: #f4f4f4;
    position: absolute;
    display: block;
  }
  .submenu li {
    padding: 5px 10px;
  }
  .submenu-icon {
    margin-left: 5px;
    font-size: 12px;
  }
</style>
