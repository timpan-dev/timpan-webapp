import React, { useEffect } from "react"
import styled from 'styled-components'
import { pageWidth, primaryColor } from '~/utils/styling'
import { Link, useStaticQuery, graphql } from "gatsby"
import { brighten, secondaryColor } from "~/utils/styling"

const mobileBreakpoint = 620

const StyledFooter = styled.footer`
  min-height: 200px;
  background: ${primaryColor};
  font-size: 15px;
  padding: 10px 20px;
  .content-box {
    max-width: ${pageWidth}px;
    margin: auto;
  }

  .copyright {
    text-align: center;
    margin-top: 30px;
  }

  .call-us {
    text-align: left;
    width: 100%;
    p {
      font-size: 14px;
      color: #777;
      font-style: normal;
      font-weight: 700;
      margin: 0;
    }
    .phone {
      font-size: 20px;
      font-weight: 400;
      a {
        color: black;
        &:visited { color: black };
        &:active { color: black };
        &:hover { color: black };
      }
    }
  }

  .contact {
    margin-left: 20px;
    &:first-child { margin-left: 0; }
  }

  .block-1 {
    flex: 2;
  }

  .block-2 {
    align-items: stretch;
    flex: 1;
    margin-left: 25px;
    @media (max-width: ${mobileBreakpoint}px) {
      margin-left: 0;
      margin-top: 25px;
    }
  }

  .social {
    @media (max-width: ${mobileBreakpoint}px) {
      align-self: flex-end;
    }
    margin-top: 20px;
    font-size: 30px;
    a {
      color: black;
      margin-left: 20px;
      &:first-child { margin-left: 0; }
      &:hover {
        color: ${secondaryColor};
      }
    }
  }

  h2 {
    font-size: 20px;
    font-weight: 700;
    text-align: left;
    line-height: 40px;
    margin: 0 0 10px;
  }

  h3 {
    font-size: 20px;
    font-weight: 400;
    text-align: left;
    line-height: 40px;
    margin: 0 0 10px;
  }
  
  p {
    font-size: 15px;
    text-align: left;
  }
`

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
`

const FlexCol = styled.div`
  display: flex;
  flex-direction: column;
`

const FlexRow2Col = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: ${mobileBreakpoint}px) {
    flex-direction: column;
  }
`

const FlexCol2Row = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: ${mobileBreakpoint}px) {
    flex-direction: row;
  }
`

const Typeform = styled.a`
  display: inline-block;
  text-decoration: none;
  background-color: ${secondaryColor};
  color: #ccc;
  &:visited {
    color: #ccc;
  }
  &:hover {
    color: #fff;
  }
  &:active {
    color: #fff;
  }
  cursor: pointer;
  /* font-family: Helvetica, Arial, sans-serif; */
  font-size: 20px;
  line-height: 50px;
  text-align: center;
  margin: 20px auto 0;
  height: 50px;
  padding: 0px 33px;
  border-radius: 25px;
  max-width: 100%;
  align-self: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: bold;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`

const Footer: React.FC = () => {
  const data = useStaticQuery(graphql`
    query metadataForSubtitle {
      site {
        siteMetadata {
          youtubeUrl
          instagramUrl
          vkUrl
        }
      }
    }
  `)

  useEffect(() => {
    const script = document.createElement("script")
    script.innerText =
      '(function() { var qs,js,q,s,d=document, gi=d.getElementById, ce=d.createElement, gt=d.getElementsByTagName, id="typef_orm_share", b="https://embed.typeform.com/"; if(!gi.call(d,id)){ js=ce.call(d,"script"); js.id=id; js.src=b+"embed.js"; q=gt.call(d,"script")[0]; q.parentNode.insertBefore(js,q) } })()'
    document.body.appendChild(script)
    return () => {
      if (script) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <StyledFooter>
      <FlexCol className="content-box">
        <FlexRow2Col>
          <FlexCol className="block-1" style={{ flex: `2` }}>
            <h2>Творческая группа «Тимпан»</h2>
            <FlexRow>
              <div className="contact" style={{ flex: `1` }}>
                <strong>Художественный руководитель и композитор</strong>
                <br />
                Владимир Казбанов:
                <br />
                +375 44 799-73-66 (A1)
              </div>
              <div className="contact" style={{ flex: `1` }}>
                <strong>Хормейстер и руководитель</strong>
                <br />
                Ольга Кривошеева:
                <br />
                +375 29 181-65-85 (A1)
                <br />
                E-mail: timpan@list.ru
              </div>
            </FlexRow>
          </FlexCol>
          <FlexCol2Row className="block-2" style={{ flex: `1` }}>
            <div className="call-us" style={{ flex: `1` }}>
              <h3>Как заказать концерт?</h3>
              <p>Просто позвоните нам:</p>
              <p className="phone">
                <a href="tel:+375447997366">+375(44)799-73-66</a>
              </p>
            </div>
            <FlexRow
              className="social"
              style={{ flexDirection: `row`, flex: `1` }}
            >
              <a
                rel="nofollow"
                href={data.site.siteMetadata.vkUrl}
                className="icon-soc-vk"
              ></a>
              <a
                rel="nofollow"
                href={data.site.siteMetadata.youtubeUrl}
                className="icon-soc-youtube"
              ></a>
              <a
                rel="nofollow"
                href={data.site.siteMetadata.instagramUrl}
                className="icon-soc-instagram"
              ></a>
            </FlexRow>
          </FlexCol2Row>
        </FlexRow2Col>
        <FlexRow>
          <Typeform
            className="typeform-share button"
            href="https://rpm42.typeform.com/to/W641yu"
            data-mode="popup"
          >
            Написать письмо
          </Typeform>
        </FlexRow>
        <FlexRow className="copyright" style={{ alignSelf: `center` }}>
          © ТИМПАН, 2020
        </FlexRow>
      </FlexCol> 
    </StyledFooter>
  )
}

export default Footer
