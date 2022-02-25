/** @jsx jsx */
/* eslint-disable jsx-a11y/no-autofocus, react/jsx-no-target-blank */
import { jsx } from "theme-ui"
import React from "react"
import { Link, useStaticQuery, graphql, navigate } from "gatsby"
import { FaSearch } from "react-icons/fa"
import { useCombobox } from "downshift"
import Fuse from "fuse.js"
import Footer from './footer/footer_main';

import * as icons from "../utils/icons"
import { rhythm } from "../utils/typography"
import Logo from "./logo"
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #23272A
  }
  h3 {
    color: #ffffff;
  }
  h2 {
    color: #ffffff;
  }
  h1 {
    color: #ffffff;
  }
`

function SearchInput(props) {
  const [text, setText] = React.useState("")
  const [focused, setFocused] = React.useState(false)

  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
          texts {
            searchPlaceholderText
          }
        }
      }
      articles: allMarkdownRemark {
        nodes {
          id
          fields {
            slug
            collection {
              icon
            }
          }
          frontmatter {
            title
            description
          }
          headings {
            # depth
            value
          }
          # excerpt(format: PLAIN)
        }
      }
    }
  `)

  const items = data.articles.nodes

  const fuse = React.useMemo(
    () =>
      new Fuse(items, {
        shouldSort: true,
        tokenize: true,
        threshold: 0.6,
        location: 0,
        distance: 100,
        minMatchCharLength: 1,
        keys: [
          "frontmatter.title",
          "frontmatter.description",
          "headings.value",
        ],
      }),
    [items]
  )

  const [inputItems, setInputItems] = React.useState(data.articles.nodes)

  const combobox = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(fuse.search(inputValue).map((node) => node.item))
    },
    itemToString: (node) => (node ? node.frontmatter.title : ""),
    onSelectedItemChange: ({ selectedItem }) => {
      navigate(selectedItem.fields.slug)
    },
  })

  return (
    <div sx={{ position: "relative" }} {...combobox.getComboboxProps()}>
      <GlobalStyle />
      <label
        htmlFor="search"
        {...combobox.getLabelProps({
          htmlFor: "search",
        })}
        sx={{
          position: "absolute",
          left: "18pt",
          top: "0",
          bottom: "0",
          display: "flex",
          alignItems: "center",
          cursor: "text",
        }}
      >
        <FaSearch color={focused ? "#828A97" : "rgba(255,255,255,0.2)"} />
      </label>
      <input
        id="search"
        type="text"
        value={text}
        autoFocus
        onChange={(event) => setText(event.target.value)}
        placeholder={data.site.siteMetadata.texts.searchPlaceholderText}
        autoComplete="off"
        sx={{
          backgroundColor: "rgba(255,255,255,0.2)",
          transition: "background .4s, box-shadow .2s",
          width: "100%",
          padding: "20px 32px 21px 56px",
          background: "rgba(255,255,255,0.1)",
          border: "none",
          outline: "none",
          color: "searchTextColor",
          fontSize: "18px",
          lineHeight: "18px",
          borderRadius: 2,
          "&:focus": {
            backgroundColor: "rgba(255,255,255,0.1)",
            boxShadow: "0 10px 20px rgba(0,0,0,0.14)",
            color: "searchTextColor",
          },
          "::placeholder": {
            color: "searchTextPlaceholderColor",
          },
          "&:focus::placeholder": {
            color: "searchTextPlaceholderColor",
          },
        }}
        {...combobox.getInputProps({
          id: "search",
          onFocus: () => setFocused(true),
          onBlur: () => setFocused(false),
        })}
      />
      <div
        {...combobox.getMenuProps()}
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "calc(20px + 21px + 18px)",
          alignItems: "center",
          cursor: "text",
          background: "#2C2F33",
          color: "comboboxColor",
          zIndex: 4,
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2,
          boxShadow: "0 3px 8px 0 rgba(0,0,0,0.03)",
        }}
      >
        {combobox.isOpen &&
          inputItems.map((node, index) => {
            // skip drafts and "hidden" articles (ones without a collection)
            if (!node.fields || !node.fields.collection) return null

            const icon = jsx(
              icons[node.fields.collection.icon],
              { sx: { color: "iconColor" }, size: "2rem" },
              null
            )
            return (
              <Link
                key={node.id}
                to={node.fields.slug}
                sx={{
                  display: "flex",
                  pl: 3,
                  pr: 5,
                  py: 3,
                  textDecoration: "none",
                  background:
                    combobox.highlightedIndex === index ? "#7289DA" : "initial",
                  "&:hover": {
                    textDecoration: "none",
                  },
                }}
                {...combobox.getItemProps({ item: node, index })}
              >
                <div
                  sx={{
                    display: ["none", "flex"],
                    alignItems: "center",
                    pr: 3,
                  }}
                >
                  {icon}
                </div>
                <div sx={{ flex: "auto" }}>
                  <h3 sx={{ my: 0, fontSize: 3 }}>{node.frontmatter.title}</h3>
                  <p
                    sx={{
                      my: 0,
                      color: "articleDescriptionColor",
                      fontSize: [1, 2],
                    }}
                  >
                    {node.frontmatter.description}
                  </p>
                </div>
              </Link>
            )
          })}
      </div>
    </div>
  )
}

class Layout extends React.Component {
  render() {
    const { location, children, description } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <div>
        <div
          sx={{
            py: 3,
            color: "headerText",
            backgroundColor: "headerBackground",
          }}
        >
          {location.pathname === rootPath ? (
            <header
              sx={{
                mx: `auto`,
                maxWidth: rhythm(30),
                fontSize: 3,
                px: [2, 4],
                pt: 4,
                pb: 2,
              }}
            >
              <Logo color="white" size={["36px", "48px"]} />
              <p sx={{ pt: 2, pb: 2, mb: 2, mt: 2, fontSize: [2, 3] }}>
                {description}
              </p>
              <SearchInput />
            </header>
          ) : (
            <header
              sx={{
                marginLeft: `auto`,
                marginRight: `auto`,
                maxWidth: rhythm(30),
                px: [2, 4],
                pt: 4,
                pb: 2,
              }}
            >
              <h3
                sx={{
                  mt: 0,
                  mb: 3,
                }}
              >
                <Link
                  sx={{
                    boxShadow: `none`,
                    textDecoration: `none`,
                    color: `logoColor`,
                    "&:hover": {
                      textDecoration: "none",
                      color: "logoColor",
                    },
                  }}
                  to={`/`}
                >
                  <Logo color="white" size={["36px", "48px"]} />
                </Link>
              </h3>
              {location.pathname === rootPath && <p>{description}</p>}
              <SearchInput />
            </header>
          )}
        </div>
        <div
          style={{
            background: "#16151D",
          }}
        >
          <main
            sx={{
              mx: `auto`,
              maxWidth: rhythm(30),
              px: [2, 4],
              py: [3],
            }}
          >
            {children}
          </main>
        </div>
        <Footer />
      </div>
    )
  }
}

export default Layout
