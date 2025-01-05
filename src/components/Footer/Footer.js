import React from "react";
// import icon2 from "./icon-2.svg";
// import icon3 from "./icon-3.svg";
// import icon4 from "./icon-4.svg";
// import icon5 from "./icon-5.svg";
// import icon6 from "./icon-6.svg";
// import icon from "./icon.svg";
// import image1 from "./image-1.png";
// import image from "./image.svg";
// import list from "./list.svg";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="background-border">
        <div className="strong">고객센터 공지사항</div>

        <div className="container">
          <div className="list">
            <div className="group-2">
              <div className="text-wrapper">·</div>

              <div className="link">
                <div className="text-wrapper-2">[공지]</div>
              </div>

              {/* <img className="icon-2" alt="Icon" src={icon2} /> */}
            </div>
          </div>
        </div>

        <div className="vertical-border">
          <div className="list-2">
            <div className="item-link">출제자 모집</div>

            <div className="item-link-2">강사모집</div>

            <div className="item-link-3">서비스 제안하기</div>
          </div>
        </div>
      </div>

      <div className="list-3">
        <div className="div-wrapper">
          <div className="text-wrapper-3">몰입캠프소개</div>
        </div>

        <div className="item-link-4">
          <div className="text-wrapper-4">개인정보처리방침</div>
        </div>

        <div className="item-link-5">
          <div className="text-wrapper-5">이용약관</div>
        </div>

        <div className="item-link-wrapper">
          <div className="item-link-6">
            <div className="text-wrapper-5">사이트맵</div>
          </div>
        </div>

        <div className="item-link-7">
          <div className="text-wrapper-6">찾아오시는길</div>
        </div>
      </div>

      <div className="address">
        <p className="element-IT-l">
          주소 : 대전광역시 유성구 대학로 291 (IT 융합연구소 111호)&nbsp;&nbsp;l
          1분반 운영진 : 박영민
        </p>

        <p className="l-dgist-ac">
          개발자 : 대구경북과학기술원 l&nbsp;&nbsp;김나혜 : 이메일 :
          knh2222@dgist.ac.kr
          <br />
          개발자 : 한양대학교 | 이정규 : 이메일 :
        </p>
      </div>

      {/* <img className="list-4" alt="List" src={list} />

      <img className="image" alt="Image" src={image1} /> */}

      <div className="link-2" />
    </div>
  );
};

export default Footer;
