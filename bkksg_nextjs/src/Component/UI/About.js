import React, { useEffect } from "react";
import styled from "styled-components";
import { CgChevronLeft, CgArrowBottomLeftO, CgAirplane } from "react-icons/cg";
import { useRouter } from "next/router";

/**
 *
 * 뒤로가기 버튼을 적용한다.
 *  Header, Sidebar는 사라진다.
 */
const Bo = styled.div`
  animation: modal-show 0.3s;
  background-image: url("/jogakbo/8.jpg");
  min-height: 100vh; /* 최소 높이 100vh */
  height: auto; /* 내용에 맞게 자동 조절 */
  overflow-y: auto; /* 수직 스크롤 허용 */
  overflow-x: hidden; /* 가로 스크롤 방지 */

  @media (max-width: 850px) {
    overflow-y: auto; /* 모바일 환경에서도 스크롤 가능하게 설정 */
  }
`;

const AboutContainer = styled.div`
  color: white;
  width: 80vw;
//   margin: 2.5rem 4rem 2rem 2rem;
//   min-height: 100vh;
  height: auto;
`;

const BackButton = styled.div`
  &:hover {
    opacity: 1;
  }
`;

const About = ({ detailHandler }) => {
  const router = useRouter();
  const goBack = (e) => {
    try {
      if (e) router.push("/");
    } catch (err) {
      throw new Error("Failed to Go Back.");
    }
  };

  useEffect(() => {
    detailHandler(true); // Header & Sidbar 없애는 이벤트 함수
  }, []);

  return (
    <>
      <Bo className="bo-container">
        <BackButton className="bo-back-btn" onClick={goBack}>
          <CgChevronLeft />
        </BackButton>
        <AboutContainer>
          <div className="about_namespace">
            <span className="about_name">임이로&nbsp;</span>
            <span>LIM I RO</span>&nbsp;&nbsp;<CgAirplane/>
          </div>
          <br />
          <div>
            bkksg.studio@gmail.com | poetdeveopler.iro@gmail.com
          </div>
          <p className="about_text"><span className="years">Academic Interests | </span> Korean Literature, Humanities, Data Analytics, Data Visualization, Media Aesthetics, and Art </p>
          <br />
          
          <a className="about_link" href="/IROLIM_CV.pdf" download>
            Download IROLIM CV.pdf
          </a>
          <br/>
          <div className="about_content">
            <h1 className="about_index">Education </h1>
            <p className="about_text">
              <span className="years">2024 ~</span> 한국학중앙연구원 한국학대학원
              인문정보학 석사 재학 中
            </p>
            <p className="about_text">
              <span className="years">2019</span> 홍익대학교 광고홍보학부
              경영학사
            </p>
            <p className="about_text">
              <span className="years">2019</span> 홍익대학교 디지털미디어디자인
              미술학사
            </p>
          
            <br />
            <h1 className="about_index">Project</h1>
            <p className="about_text">
              <span className="years">2025.3 ~ </span> UNIST "네트워크형 디지털
              인문학 교육모델 개발" 참여연구원 참여 中
            </p>
            <p className="about_text">
              <span className="years">2025.3 ~ </span>DH2026 운영 기술지원분과
              보조연구원 - 디지털 인문학 국제학술행사 웹사이트 구축 中
            </p>
            <p className="about_text">
              <span className="years">2025.2 </span>제2회 한국현대문학자대회 - 
              "한국 근현대시 감정 라벨링 데이터셋 구축: 문학 텍스트의 컴퓨터
              기반 감정 분류와 생성형 AI 활용을 위한 기초 연구" - 포스터발표
              (임이로, 지해인, 김병준) <a className="about_link" target="_blank" href="https://www.kadh.org/%ED%95%99%EC%88%A0%EB%8C%80%ED%9A%8C-%EC%A0%9C2%ED%9A%8C-%ED%95%9C%EA%B5%AD%ED%98%84%EB%8C%80%EB%AC%B8%ED%95%99%EC%9E%90%EB%8C%80%ED%9A%8C250212-13/"><CgArrowBottomLeftO/></a>
            </p>
            <p className="about_text">
              <span className="years">2024.9 ~ 2025.2</span> "정조명찬 《인물고》 LOD
              시스템 구축 <a className="about_link" target="_blank" href="https://wikidocs.net/book/16878"><CgArrowBottomLeftO/></a>" - 디지털인문학 시리즈 (김바로, 임이로 et. al.)
              참여연구원 및 위키독스 발행 
            </p>
            <p className="about_text">
              <span className="years">2025.1</span> "WORLD ART EXPO 2025 - IAA 수상 작가전 /홍익 세화전" 전시 기획 참여 및 디자인
            </p>
            <p className="about_text">
              <span className="years">2024.12</span> 시집 "오늘도 꽃은 피어라 <a className="about_link" target="_blank" href="https://ebook-product.kyobobook.co.kr/dig/epd/ebook/E000010798546"><CgArrowBottomLeftO/></a>"
              전자책 발간
            </p>
            <p className="about_text">
              <span className="years">2024.3 ~ 2024.9</span> "XML/TEI with 인문학 <a className="about_link" target="_blank" href="https://wikidocs.net/book/14569"><CgArrowBottomLeftO/></a>" -
              디지털인문학 시리즈 (김바로, 임이로 et. al.) 보조연구원 및
              위키독스 발행
            </p>
            <p className="about_text">
              <span className="years">2024.7</span> "충청국학디지털아카이브
              지식관계망 데이터 <a className="about_link" target="_blank" href="https://archives.ikcc.or.kr/network/view?themeId=T0022"><CgArrowBottomLeftO/></a>" 구축 보조 연구원
            </p>
            <p className="about_text">
              <span className="years">2023.10</span> 제 5회 코스미안상
              인문칼럼영역 은상 수상
            </p>
            <p className="about_text">
              <span className="years">2023.6</span> 하나은행 H.ART1 프로젝트 전시 "CROSSING ONE" 브랜드 디지인
            </p>
            <p className="about_text">
              <span className="years">2022.7</span> 웹 갤러리사이트 "비껴서기" 
              풀스텍(Full-Stack) 기획 및 개발 <a className="about_link" target="_blank" href="https://github.com/poet-developer/BKKSG"><CgArrowBottomLeftO/></a>
            </p>
            <p className="about_text">
              <span className="years">2019.2</span> 작품집 "오늘도 꽃은 피어라
              전시" (홍익대학교 세종캠퍼스 세종관)
            </p>
            <p className="about_text">
              <span className="years">2018.11</span> 졸업전시회 ".WAV"
              미디어아트 인스톨레이션 "파란시간" 전시 (홍익대학교
              대학로캠퍼스){" "}
            </p>
            <p className="about_text">
              <span className="years">2018.4</span> 홍익대학교 광고홍보학부 BI "BLANK" 기획 및 디자인 후보 선정
            </p>
            <p className="about_text">
              <span className="years">2017.11</span> 어쿠스틱 공연
              주최 "무중력" 기획 및 총괄 (카페 "로비")
            </p>
            <p className="about_text">
              <span className="years">2017.6</span> "광고를 광고한다!" IMC 캠패인 기획 공모전 충청지역예선 장려상 수상
            </p><br/>

              <h1 className="about_index">Work Experience</h1>
            <p className="about_text">
              <span className="years">2024.12 ~</span> 홍익미술
              큐레이터/디자이너
            </p>
            <p className="about_text">
              <span className="years">2023.10 ~</span>코스미안뉴스 인문영역
              칼럼니스트
            </p>
            <p className="about_text">
              <span className="years">2023.5 ~ 2023.6</span> 갤러리 상업화랑
              전시 기획 인턴
            </p>
            <p className="about_text">
              <span className="years">2023.2 ~ 2023.4</span> 복합문화공간 식물관
              PH 공간 기획 인턴
            </p><br/>

            <h1 className="about_index">Skills</h1>
            <p className="about_text"><span className="years">Programming Language | </span>JavaScript, Python, Arduino&Processing(C/C++) </p>
            <p className="about_text"><span className="years">2D Graphic Design | </span>Photoshop, Illustrator, Indesign, Premeire </p>
            <p className="about_text"><span className="years">3D Graphic Design | </span>Blender, C4D </p>
            <p className="about_text"><span className="years">Database | </span> SQL, NoSQL, RDF</p><br/>

            <h1 className="about_index">ETC.</h1>
            <p className="about_text"><span className="years">2024 ~ </span> 소설 집필 中</p>
            <p className="about_text"><span className="years">2024 ~ </span> 브런치 스토리 운영 中</p>
            <p className="about_text"><span className="years">2013 ~ 2019 </span> Performed as a Vocalist in various bands</p><br/>
               <hr/>
               <p className="about_etc"></p>
            <p className="about_etc">I am an Author & Researcher. Also, I love playing the piano and guitar. <CgAirplane/></p>
          </div>
        </AboutContainer>
      </Bo>
    </>
  );
};

export default About;
