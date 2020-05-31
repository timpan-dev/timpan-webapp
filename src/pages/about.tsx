import React from 'react'
import Layout from '~/components/Layout'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import SEO from '~/components/SEO'
import styled from 'styled-components'
import { pageWidth, secondaryColor, contentWidth } from '~/utils/styling'
import Z1SvgSrc from '~/assets/about/z-1.svg'
import Z2SvgSrc from '~/assets/about/z-2.svg'
import Z3SvgSrc from '~/assets/about/z-3.svg'
import Z4SvgSrc from '~/assets/about/z-4.svg'
import Z5SvgSrc from '~/assets/about/z-5.svg'
import Z6SvgSrc from '~/assets/about/z-6.svg'
import Z7SvgSrc from '~/assets/about/z-7.svg'

interface IAboutPageProps {
  data: any
}

const AboutContainer = styled.div`
  margin: 20px auto;
  max-width: ${ contentWidth }px;
  h2 {
    /* font-size: 40px; */
    text-align: center;
    color: ${secondaryColor};
    margin: 40px 0 40px;
  }
  p {
    font-size: 17px;
  }
  @media(max-width: ${contentWidth + 20}px) {
    padding: 0 10px;
  }

  em {
    color: #843235;
    font-weight: bolder;
    font-style: normal;
  }
`

const Row = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  margin-bottom: 80px;
  &.reverse {
    flex-direction: row-reverse;
    p {
      text-align: right;
    }
  }
  @media(max-width: 420px) {
    flex-direction: column;
    align-items: center;
    &.reverse {
      flex-direction: column;
    }
  }
`

const ImgCol = styled.div`
  flex: 0 2 200px;
  width: 200px;
  img {
    border-radius: 30px;
  }
  img.svg {
    border-radius: 0;
    overflow: hidden;
    object-fit: contain;
    max-width: 200px;
  }
`
const Gap = styled.div`
  flex: 0 1 30px;
`
const TextCol = styled.div`
  flex: 1 2 auto; 
`

const AboutPage: React.FC<IAboutPageProps> = ({data}) => {
  return (
    <Layout>
      <AboutContainer>
        <Img fluid={data.top.childImageSharp.fluid}></Img>
        <h2>О Нас</h2>
        <p>
          Ансамбль «Тимпан» создан в 1994 году композитором В.А.Казбановым.
          Благое начинание поддержали и благословили схиархимандрит Митрофан
          (Ильин) Жировический и протоирей Николай (Гурьянов).
        </p>
        <p>
          Министерством культуры Беларуси ансамблю присвоено звание «образцовый»
          Авторское тврочество и просветительская деятельность ансамбля
          направленны на детей, подростков и молодежь, ориентации их на
          нравственные, духовные и культурные ценности народа.
        </p>
        <p>
          Неотъемлемой частью работы ансамбля являются дела милосердия — это
          многочисленные благотворительные концерты в детских домах-интернатах,
          больицах, школах, тюрьмах, домах престарелых.
        </p>

        <h2>Состав творческой группы «Тимпан»</h2>

        <Row>
          <ImgCol>
            <Img fixed={data.s.edges[0].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Художественный руководитель</strong> – композитор
              В.А.Казбанов, лауреат 3 Всесоюзного конкурса народного творчества,
              многократный лауреат многочисленных республиканских и
              международных конкурсов и фестивалей эстрадного творчества
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row className="reverse">
          <ImgCol>
            <Img fixed={data.s.edges[1].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Хормейстер, музыкальный руководитель</strong> – О.В.Кривошеева, 
              лауреат республиканского конкурса исполнителей, 
              лауреат международных конкурсов и фестивалей.
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row>
          <ImgCol>
            <Img fixed={data.s.edges[2].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p style={{textAlign: 'left'}}>
              <strong>Звукорежиссёр</strong> – В.А. Саулич, лауреат республиканского конкурса исполнителей.
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>
        <Row>
          <Gap></Gap>
          <TextCol>
            <p style={{ textAlign: 'left' }}>
              <strong>Режиссёр</strong> – З.А. Павловская, режиссёр детской редакции Белтелерадиокомпании.
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <h2>Инструментальное сопровождение</h2>

        <Row>
          <ImgCol>
            <img src={Z1SvgSrc} className="svg"></img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Флейта</strong> – Д.В.Толмачёв, солист Белгосфилармонии, лауреат Республиканского конкурса исполнителей 
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row className="reverse">
          <ImgCol>
            <img src={Z2SvgSrc} className="svg"></img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Гитара</strong> – Ю.П. Хиловец, артист оркестра Государственного драмтеатра имени Я.Купалы 
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row>
          <ImgCol>
            <img src={Z3SvgSrc} className="svg"></img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>12-струнная гитара</strong> – В.А. Казбанов
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row className="reverse">
          <ImgCol>
            <img src={Z4SvgSrc} className="svg"></img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Бас-гитара</strong> – Е.П. Черкасов, артист Белгосфилармонии 
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row>
          <ImgCol>
            <img src={Z7SvgSrc} className="svg"></img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Виолончель</strong> – Л.В. Бородина – концертмейстер оркестровой группы 
              Государственного симфонического оркестра РБ
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row className="reverse">
          <ImgCol>
            <img src={Z5SvgSrc} className="svg"></img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Рояль</strong> – Н.А. Русина, лауреат республиканских , дипломант международного конкурсов исполнителей 
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row>
          <ImgCol>
            <img src={Z6SvgSrc} className="svg"></img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Скрипка</strong> – О.В. Кривошеева, лауреат республиканского конкурса исполнителей
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <h2>Солисты</h2>

        <Row>
          <ImgCol>
            <Img fixed={data.s.edges[3].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Александр Тиханович</strong> – 
              народный артист Республики Беларусь
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row className="reverse">
          <ImgCol>
            <Img fixed={data.s.edges[4].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Ядвига Поплавская</strong> – 
              народная артистка Республики Беларусь
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row>
          <ImgCol>
            <Img fixed={data.s.edges[5].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Владимир Роговцов</strong> – 
              заслуженный артист Республики Беларусь
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row className="reverse">
          <ImgCol>
            <Img fixed={data.s.edges[6].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Ирина Нарбекова</strong> – артистка  театра и кино
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row>
          <ImgCol>
            <Img fixed={data.s.edges[7].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Ольга Патрий</strong> – 
              певица, лауреат многочисленных конкурсов и фестивалей,
              обладатель награды РПЦ—медали «Покрова» Божей Матери»                                                                                                           
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row className="reverse">
          <ImgCol>
            <Img fixed={data.s.edges[8].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Анастасия Тиханович</strong> – артистка эстрады
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row>
          <ImgCol>
            <Img fixed={data.s.edges[9].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Людмила Кравцова</strong> –  артистка эстрады
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row className="reverse">
          <ImgCol>
            <Img fixed={data.s.edges[10].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Марина Малаш</strong>
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row>
          <ImgCol>
            <Img fixed={data.s.edges[11].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Анастасия Романовская</strong>
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row className="reverse">
          <ImgCol>
            <Img fixed={data.s.edges[12].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Александр Воронцов</strong>
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <h2>Вокальная группа</h2>

        <Row>
          <ImgCol>
            <Img fixed={data.s.edges[13].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Мария Казбанова</strong>
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row className="reverse">
          <ImgCol>
            <Img fixed={data.s.edges[14].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Александра Романовская</strong>
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row>
          <ImgCol>
            <Img fixed={data.s.edges[15].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Ксения Волкова</strong>
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row className="reverse">
          <ImgCol>
            <Img fixed={data.s.edges[16].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Серафим Рудченко</strong>
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row>
          <ImgCol>
            <Img fixed={data.s.edges[17].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Мария Русина</strong>
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <Row className="reverse">
          <ImgCol>
            <Img fixed={data.s.edges[18].node.childImageSharp.fixed}></Img>
          </ImgCol>
          <Gap></Gap>
          <TextCol>
            <p>
              <strong>Вера Филипова</strong>
            </p>
          </TextCol>
          <Gap></Gap>
        </Row>

        <h2>Проект «Мы вместе»</h2>


        <p>
          Наш проект <em>
            возрождает приоритетные ценности культуры и формирует 
            нравственное и гражданское сознание
          </em> детей и молодежи.
        </p>

        <p>
          Его реализация поможет слушателям <em>
            расширить свои познания о смысле
            человеческого существования
          </em>, обрести нравственный фундамент.
          <em>Чувство национальной гордости и любви к Родине</em>, поспособствует через
          художественные образы постичь глубину Православного мировозрения и <em>христианское отношение к окружающему миру</em>.
        </p>

        <p>
          Предполагается <em>
            сотрудничество как с организациями Белорусской 
            Православной Церкви
          </em>, так и с <em>
            государственными и светскими
            учереждениями
          </em>.
        </p>

        <Img fluid={data.bottom.childImageSharp.fluid}></Img>

        <p>
          У коллектива есть <em>богатый опыт работы на профессиональных площадках</em>,
          таких как Белорусская Государственная Филармония, ДК Республики и России, 
          Театры Минска, Концертный зал «Минск», Летний амфитеатр «Витебск».
        </p>
        
        <p>
          Предусматриваются <em>следующие формы работы</em>:
        </p>
        
        <p>
          Круглые столы по проблемам творчества, музыкальные встречи, 
          музыкальные гостиные, музыкально-поэтические вечера, тематические 
          программы, мастер — классы, творческие вечера композиторов, поэтов, артистов
        </p>

        <p><br /></p>

        <p>
          Творчество группы «Тимпан» неоднократно освещалось средствами 
          массовой информации Беларуси и России. Коллектив частный гость 
          таких <em>радиопередач</em>, как <em>
            «Автограф», «Музыкальный Олимп», 
            «Мэри Поппинс», «Наши дети», «Для тех, кто дома», «Свет души», 
            «Калыханка»
          </em>.
        </p>
        
        <p>
          Творчеству композитора В.Казбанова и творческой группы «Тимпан»
          посвящены следующие телепередачи:
          <em>
            «Сущность», «Телебом», «Все дело в шляпе», «Музыка — школе»,
            «Многоголосие», «Музыкальная шкатулка», «Калыханка»
          </em> и другие программы Белтелерадиокомпании.
          Также творчество В.Казбанова представлено <em>
            на православном телеканале
            «Союз»
          </em>, широко освещается <em>в печати</em>
        </p>

        <p><br/></p>

        <p>
          <em>В репертуаре коллектива более 200</em> песен Владимира Казбанова на стихи
          классических и современных поэтов, много авторских концертных программ. Среди них особой популярностью пользуются:
        </p>
        
        <p>
          «Любить и прощать» на стихи В. Поликаниной, «Покаяния двери» и  
          «Улица Преображенская» на стихи схимонахини Анастасии (Шерешевской),  
          «Край родной» на стихи классических и современных поэтов, «Девушка пела» 
          на духовную поэзию классических и современных поэтов, «Сон
          дзяўчынкі Алінкі» на стихи М.Лукши, «Памятка» на стихи игумена 
          Виссариона (Остапенко), «Именины» на стихи игумена Виссариона (Остапенко),
          «Яблочный спас» на стихи Е.Михаленко, «Православная азбука»
          на стихи Е.Екимовой, «Тишина»на стихи архиепископа Сан-Францисского Ионна (Шаховского) и др.
        </p>

        <h2>«Тимпан» награжден</h2>

        <p>
          <em>Патриаршей Грамотой</em> за усердные труды во славу Русской Православной
          Церкви (2001 г., 2002 г.)
          <em>Грамотой Патриаршего Экзарха всея Беларуси</em> за труды во славу Церкви
          Христовой (2002 г.)
          <em>Грамота 5 международного Фестиваля</em> Православных Песнопений (2002 г.)
          <em>Грамотой Витебской Епархии</em> за многолетнее тюремное служение (2014 г.),
          а также многочисленные грамоты и дипломы за участие в духовно-просветительских 
          мероприятиях Белорусской Православной Церкви (2001 - 2014 гг.)
        </p>

        <p>
          За высокое исплонительское мастерство, творческое развитие
          национальных культурных традиций и активную концертную деятельность
          <em>Министерство Культуры  РБ присвоило</em> ансамблю «Тимпан» <em>звание «образцовый»</em> (2001 г.)
        </p>

        <p style={{marginBottom: `160px`}}>
          Ансамбль неоднократно становился <em>лауреатом и получал Гранпри</em> на 
          фестивалях и конкурсах:
          «Пасха Красная» (Сергев Посад, 2001, 2002 гг.), «Сузорье» (2004, 2009 гг.),
          «Благовест», «Сердце России» (Березняки, 2006 г.), «Одигитрия» (Витебск, 2007 г.)
          «Ковчег» (Воронеж, 2012 г.), «Братья» (Силичи, 2009 г.), «Магутны Божа» (Могилев)
        </p>


      </AboutContainer>
      <SEO></SEO>
    </Layout>
  )
}

export default AboutPage

export const query = graphql`
  query QueryAboutPageImages {
    top: file(relativePath: {eq: "about/top.jpg"}, sourceInstanceName: {eq: "assets"}) {
      childImageSharp {
        fluid(maxWidth: 880, quality: 85) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    bottom: file(relativePath: {eq: "about/bottom.jpg"}, sourceInstanceName: {eq: "assets"}) {
      childImageSharp {
        fluid(maxWidth: 880, quality: 85) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    s: allFile(filter: {
        relativePath: {regex: "/about/s-\\d+\\.jpg$/"},
        sourceInstanceName: {eq: "assets"}
    }, sort: {fields: name}) {
      edges {
        node {
          childImageSharp {
            fixed(width: 200, height: 200, quality: 85) {
              ...GatsbyImageSharpFixed_tracedSVG
            }
          }
        }
      }
    }
  }
`