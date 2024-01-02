'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nest-project-2 documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AdminsModule.html" data-type="entity-link" >AdminsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AdminsModule-2982860a66052c6ae19294b8acc47bf1f58123639fb9c6bb8c18a3e06533220cff9d75cb3c908d9a9a08002c85e9b0f1a07f93820a7a6ba44d8db15bc8f53b66"' : 'data-bs-target="#xs-controllers-links-module-AdminsModule-2982860a66052c6ae19294b8acc47bf1f58123639fb9c6bb8c18a3e06533220cff9d75cb3c908d9a9a08002c85e9b0f1a07f93820a7a6ba44d8db15bc8f53b66"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AdminsModule-2982860a66052c6ae19294b8acc47bf1f58123639fb9c6bb8c18a3e06533220cff9d75cb3c908d9a9a08002c85e9b0f1a07f93820a7a6ba44d8db15bc8f53b66"' :
                                            'id="xs-controllers-links-module-AdminsModule-2982860a66052c6ae19294b8acc47bf1f58123639fb9c6bb8c18a3e06533220cff9d75cb3c908d9a9a08002c85e9b0f1a07f93820a7a6ba44d8db15bc8f53b66"' }>
                                            <li class="link">
                                                <a href="controllers/AdminsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AdminsModule-2982860a66052c6ae19294b8acc47bf1f58123639fb9c6bb8c18a3e06533220cff9d75cb3c908d9a9a08002c85e9b0f1a07f93820a7a6ba44d8db15bc8f53b66"' : 'data-bs-target="#xs-injectables-links-module-AdminsModule-2982860a66052c6ae19294b8acc47bf1f58123639fb9c6bb8c18a3e06533220cff9d75cb3c908d9a9a08002c85e9b0f1a07f93820a7a6ba44d8db15bc8f53b66"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AdminsModule-2982860a66052c6ae19294b8acc47bf1f58123639fb9c6bb8c18a3e06533220cff9d75cb3c908d9a9a08002c85e9b0f1a07f93820a7a6ba44d8db15bc8f53b66"' :
                                        'id="xs-injectables-links-module-AdminsModule-2982860a66052c6ae19294b8acc47bf1f58123639fb9c6bb8c18a3e06533220cff9d75cb3c908d9a9a08002c85e9b0f1a07f93820a7a6ba44d8db15bc8f53b66"' }>
                                        <li class="link">
                                            <a href="injectables/AdminsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdminsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-0adb75764e1d4dbfa4688fb867a3b7dfb419a1e01535597295e96d58dfc89073f61edd83ca8beee2773e8f064636562c718ca08c9cfdcf8c71e2b2ac10b36ea9"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-0adb75764e1d4dbfa4688fb867a3b7dfb419a1e01535597295e96d58dfc89073f61edd83ca8beee2773e8f064636562c718ca08c9cfdcf8c71e2b2ac10b36ea9"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-0adb75764e1d4dbfa4688fb867a3b7dfb419a1e01535597295e96d58dfc89073f61edd83ca8beee2773e8f064636562c718ca08c9cfdcf8c71e2b2ac10b36ea9"' :
                                            'id="xs-controllers-links-module-AuthModule-0adb75764e1d4dbfa4688fb867a3b7dfb419a1e01535597295e96d58dfc89073f61edd83ca8beee2773e8f064636562c718ca08c9cfdcf8c71e2b2ac10b36ea9"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-0adb75764e1d4dbfa4688fb867a3b7dfb419a1e01535597295e96d58dfc89073f61edd83ca8beee2773e8f064636562c718ca08c9cfdcf8c71e2b2ac10b36ea9"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-0adb75764e1d4dbfa4688fb867a3b7dfb419a1e01535597295e96d58dfc89073f61edd83ca8beee2773e8f064636562c718ca08c9cfdcf8c71e2b2ac10b36ea9"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-0adb75764e1d4dbfa4688fb867a3b7dfb419a1e01535597295e96d58dfc89073f61edd83ca8beee2773e8f064636562c718ca08c9cfdcf8c71e2b2ac10b36ea9"' :
                                        'id="xs-injectables-links-module-AuthModule-0adb75764e1d4dbfa4688fb867a3b7dfb419a1e01535597295e96d58dfc89073f61edd83ca8beee2773e8f064636562c718ca08c9cfdcf8c71e2b2ac10b36ea9"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-d76870d991fa0c6dd62c11e9ec25a04340658d506167cf3536af8be14418dc1344071073979b759adf6c3b2c3fa6df7eb6845c86a61b9f3abadfd407525d3cbb"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-d76870d991fa0c6dd62c11e9ec25a04340658d506167cf3536af8be14418dc1344071073979b759adf6c3b2c3fa6df7eb6845c86a61b9f3abadfd407525d3cbb"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-d76870d991fa0c6dd62c11e9ec25a04340658d506167cf3536af8be14418dc1344071073979b759adf6c3b2c3fa6df7eb6845c86a61b9f3abadfd407525d3cbb"' :
                                            'id="xs-controllers-links-module-PostsModule-d76870d991fa0c6dd62c11e9ec25a04340658d506167cf3536af8be14418dc1344071073979b759adf6c3b2c3fa6df7eb6845c86a61b9f3abadfd407525d3cbb"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-d76870d991fa0c6dd62c11e9ec25a04340658d506167cf3536af8be14418dc1344071073979b759adf6c3b2c3fa6df7eb6845c86a61b9f3abadfd407525d3cbb"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-d76870d991fa0c6dd62c11e9ec25a04340658d506167cf3536af8be14418dc1344071073979b759adf6c3b2c3fa6df7eb6845c86a61b9f3abadfd407525d3cbb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-d76870d991fa0c6dd62c11e9ec25a04340658d506167cf3536af8be14418dc1344071073979b759adf6c3b2c3fa6df7eb6845c86a61b9f3abadfd407525d3cbb"' :
                                        'id="xs-injectables-links-module-PostsModule-d76870d991fa0c6dd62c11e9ec25a04340658d506167cf3536af8be14418dc1344071073979b759adf6c3b2c3fa6df7eb6845c86a61b9f3abadfd407525d3cbb"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-5c3a0427aae65732b0d70a784b478bed7097ffa5690c249e797cb4291cdb21b4e20fa2239a1fae7b8f27c8842d6303b4db0e20a38ee637ef87e7578961059fa5"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-5c3a0427aae65732b0d70a784b478bed7097ffa5690c249e797cb4291cdb21b4e20fa2239a1fae7b8f27c8842d6303b4db0e20a38ee637ef87e7578961059fa5"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-5c3a0427aae65732b0d70a784b478bed7097ffa5690c249e797cb4291cdb21b4e20fa2239a1fae7b8f27c8842d6303b4db0e20a38ee637ef87e7578961059fa5"' :
                                            'id="xs-controllers-links-module-UsersModule-5c3a0427aae65732b0d70a784b478bed7097ffa5690c249e797cb4291cdb21b4e20fa2239a1fae7b8f27c8842d6303b4db0e20a38ee637ef87e7578961059fa5"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-5c3a0427aae65732b0d70a784b478bed7097ffa5690c249e797cb4291cdb21b4e20fa2239a1fae7b8f27c8842d6303b4db0e20a38ee637ef87e7578961059fa5"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-5c3a0427aae65732b0d70a784b478bed7097ffa5690c249e797cb4291cdb21b4e20fa2239a1fae7b8f27c8842d6303b4db0e20a38ee637ef87e7578961059fa5"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-5c3a0427aae65732b0d70a784b478bed7097ffa5690c249e797cb4291cdb21b4e20fa2239a1fae7b8f27c8842d6303b4db0e20a38ee637ef87e7578961059fa5"' :
                                        'id="xs-injectables-links-module-UsersModule-5c3a0427aae65732b0d70a784b478bed7097ffa5690c249e797cb4291cdb21b4e20fa2239a1fae7b8f27c8842d6303b4db0e20a38ee637ef87e7578961059fa5"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ValidateToken.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ValidateToken</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AdminsController.html" data-type="entity-link" >AdminsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Login.html" data-type="entity-link" >Login</a>
                            </li>
                            <li class="link">
                                <a href="classes/Post.html" data-type="entity-link" >Post</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostDto.html" data-type="entity-link" >PostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PostUpdateDto.html" data-type="entity-link" >PostUpdateDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/SignUp.html" data-type="entity-link" >SignUp</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AdminsService.html" data-type="entity-link" >AdminsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtAuthGuard.html" data-type="entity-link" >JwtAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JwtStrategy.html" data-type="entity-link" >JwtStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalAuthGuard.html" data-type="entity-link" >LocalAuthGuard</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LocalStrategy.html" data-type="entity-link" >LocalStrategy</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidateToken.html" data-type="entity-link" >ValidateToken</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/ExtendedUser.html" data-type="entity-link" >ExtendedUser</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPost.html" data-type="entity-link" >IPost</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserPayload.html" data-type="entity-link" >UserPayload</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRequest.html" data-type="entity-link" >UserRequest</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});