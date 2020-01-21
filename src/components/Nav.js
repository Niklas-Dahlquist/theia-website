import React from 'react'
import { Link } from 'gatsby'
import styled from '@emotion/styled'
import { breakpoints, colors } from '../utils/variables'
import Hamburger from '../resources/hamburger.svg'
import Multiply from '../resources/multiply.svg'
import TheiaLogoDark from '../resources/theia-logo-dark.svg'

const StyledNav = styled.div`

    @media(max-width: ${breakpoints.xmd}) {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }

    .nav {
        position: relative;
        padding-top: 5rem;
        margin-bottom: 7rem;

        @media(max-width: ${breakpoints.xmd}) {
            padding-top: 0;
        }

        .logo {
            height: 2.7rem;
            color: transparent;

            &-container {
                position: absolute;
                
                @media(max-width: 800px) {
                    top: 3rem;
                    left: 2rem;
                }

                @media(max-width: 360px) {
                    top: 1.8rem;
                }
            }
        }

        &__button {
            border: none;
            background: #fff;
            color: transparent;

            &-container {
                position: absolute;
                top: 2.3rem;
                right: 2rem;

                @media(max-width: 360px) {
                    top: 1.5rem;
                }
            }

            img {
                height: 3.5rem;

                @media(max-width: ${breakpoints.sm}) {
                    height: 3rem;
                }
            }

            @media(min-width: ${breakpoints.xmd}) {
                display: none;
            }
        }

        &__items {
            display: flex;
            justify-content: flex-end;
            list-style: none;
            width: 100%;
            z-index: 1000;

            @media(max-width: ${breakpoints.xmd}) {
                flex-direction: column;
                text-align: center;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background: white;
            }
        }

        &__item {

            margin-bottom: 3rem;

            @media(min-width: ${breakpoints.xmd}) {
                &:not(:last-child) {
                    margin-right: 3rem;
                }
            }

            @media(max-width: ${breakpoints.xmd}) {
                width: 100vw;
            }
        }

        &__link {
            position: relative;
            width: 100%;
            text-decoration: none;
            color: ${colors.greyOne};
            display: block;
            padding-bottom: .8rem;

            &::after {
                content: "";
                position: absolute;
                bottom: 0;
                right: 100%;
                left: 0;
                border-bottom: 2px solid ${colors.greyOne};
                transition: all .4s cubic-bezier(0,.5,0, 1);

                @media(max-width: ${breakpoints.xmd}) {
                    display: none;
                }
            }

            &:hover,
            &:focus {
                color: ${colors.blue};

                @media(max-width: ${breakpoints.xmd}) {
                    transform: scale(1.2);
                }

                &::after {
                    right: 0;
                    border-color: ${colors.blue};
                }
            }
        }
    }

    .active {
        color: ${colors.blue};
    }
`

class Nav extends React.Component {

    state = {
        isNavRendered: false,
    }

    handleResize = () => {
        if (window.innerWidth < 800) {
            this.setState({isNavRendered: false})
        } else {
            this.setState({isNavRendered: true})
        }
    }

    toggleNavigation = () => {
        this.setState({ isNavRendered: !this.state.isNavRendered })
    }

        componentDidMount() {
        window.addEventListener('resize', this.handleResize)
        if (window.innerWidth >= 800) {
           this.toggleNavigation()
        }
    }

    render() {
        const event = (typeof window !== 'undefined' && window.innerWidth <= 800) ? this.toggleNavigation : null
        const { shouldRenderLogo } = this.props
        return (
            <StyledNav>
                <nav className="nav">
                    <div className="nav__button-container">
                        <button
                            className="nav__button"
                            aria-label="Navigation Toggle"
                            onClick={this.toggleNavigation}
                        >
                            {this.state.isNavRendered ? <img src={Multiply} alt="close menu icon" /> : <img src={Hamburger} alt="hamburger menu icon" />}

                        </button>
                    </div>
                    { shouldRenderLogo ?        
                        <Link to="/" className="logo-container">
                            <img className="logo" src={TheiaLogoDark} alt="theia logo" />
                        </Link>: null
                    }
                    {
                        this.state.isNavRendered &&
                        <ul className="nav__items">
                            <li className="nav__item" onClick={event}>
                                <Link to="/#features" className="nav__link">Features</Link>
                            </li>
                            <li className="nav__item" onClick={event}>
                                <Link to="/docs/" className="nav__link" activeClassName="active">Documentation</Link>
                            </li>
                            <li className="nav__item" onClick={event}>
                                <a href="https://spectrum.chat/theia" target="_blank" rel="noopener noreferrer" className="nav__link">Community</a>
                            </li>
                            <li className="nav__item" onClick={event}>
                                <a href="https://typefox.io/eclipse-theia" className="nav__link" target="_blank" rel="noopener">Support</a>
                            </li>
                            <li className="nav__item" onClick={event}>
                                <a href="https://typefox.io/trainings-2" className="nav__link" target="_blank" rel="noopener">Training</a>
                            </li>
                        </ul>
                    }
                </nav>
            </StyledNav>
        )
    }
}

export default Nav
