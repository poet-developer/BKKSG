import React, { useEffect } from "react";
import { useRouter } from "next/router";
import DetailPage from "../../src/Component/page/DetailPage";
import axios from "axios";
import Error from "../../src/Component/page/Error";
import { CgChevronLeft } from "react-icons/cg";
import VisualPage from "../../src/Component/page/VisualPage";
import styled from "styled-components";
import SessionStorage from "../../src/Component/lib/SessionStorage";
import HeadMeta from "../../src/Component/lib/SEO";

const BackButton = styled.div`
  color: ${(props) => props.theme.colors.backBtn};
`;

function getContentDetail(props) {
  const { detailHandler, item } = props;
  const router = useRouter();
  const mode = router.query.mode;
  const from = router.query.fr;
  useEffect(() => {
    SessionStorage.setItem("sp", router.query.sp);
    SessionStorage.setItem("cc", router.query.cc);
    SessionStorage.setItem("saved", "saved");
    detailHandler(true); // hide header

    if (from === undefined) {
      SessionStorage.removeItem("sp");
      SessionStorage.removeItem("cc");
      SessionStorage.removeItem("saved");
    }
  }, []);

  const goBack = (e) => {
    try {
      if (e) {
        if (from !== "home") {
          if (from !== undefined) {
            router.push(`/${mode}`);
          } else {
            router.push(
              SessionStorage.getItem("mode") !== null
                ? `/${SessionStorage.getItem("mode")}`
                : "/",
            );
            SessionStorage.removeItem("mode");
          }
        } else router.push("/");
      }
    } catch (err) {
      throw new Error("Failed to Go Back.");
    }
  };

  return (
    <div className="grid-item-content detail-container">
      <HeadMeta
        title={item.title}
        topic={item.topic}
        cover={
          item.topic === "poem" || item.topic === "essay"
            ? null
            : item.cover_src
        }
        url={`https://bkksg.com/${mode}/${item.id}`}
        id={true}
      />
      <BackButton
        className="backBtn"
        onClick={goBack}
        // href={from !== 'home' ? `/${mode}` : '/'}
      >
        <CgChevronLeft />
      </BackButton>
      {/* 같은 뒤로가기 버튼  */}
      {
        item.topic === "poem" ||
        item.topic === "essay" ||
        item.topic === "project" ? (
          <DetailPage data={item} /> //poem && essay && project COMP
        ) : (
          <VisualPage data={item} />
        ) // visual COMP
      }
    </div>
  );
}

export default getContentDetail;

export async function getServerSideProps(context) {
  const id = context.params.id;
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_REACT_SERVER}api/getTheContent/`,
    {
      params: { id: id },
    },
  );
  const data = res.data;
  return {
    props: {
      item: data,
    },
  };
}
