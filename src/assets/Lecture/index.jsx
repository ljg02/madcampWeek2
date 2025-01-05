import React from "react";
// import icon1 from "./icon-2.svg";
// import icon2 from "./icon-3.svg";
// import icon3 from "./icon-4.svg";
// import icon4 from "./icon-5.svg";
// import icon5 from "./icon-6.svg";
// import icon6 from "./icon-7.svg";
import madcamplogo from "./madcamplogo.png";
// import image2 from "./image-2.png";
import studymate_logo from "./studymate_logo.png";
import line1 from "./Line-2.svg";
import line2 from "./Line-3.svg";
import positive from "./positive.svg";
import styles from "./style.module.css";


export const LectureAllFrame = () => {
  return (
    <div className={styles["lecture-all-frame"]}>
      <div className={styles.div}>
        <div className={styles.overlap}>
          <img className={styles.image} alt="" src={madcamplogo} />
          <div className={styles.div}>
            <div className={styles.teacher}>
              <div className={styles["overlap-group"]}>
                <div className={styles["teacher-profile"]} />
                <div className={styles.subject} />
              </div>
              <div className={styles["teacher-comment"]} />
            </div>
            <div className={styles.video} />
          </div>
        </div>
      </div>

      <div className={styles["commant-frame"]}>
        <div className={styles.view}>
          <div className={styles["text-wrapper"]}>댓글</div>
          <img className={styles.line} alt="Line" src={line1} />
          <img className={styles.img} alt="Line" src={line2} />
          <img className={styles.positive} alt="Positive" src={positive} />
          <div className={styles.negative} />
        </div>
        <div className={styles.group}>
          <div className={styles.rectangle} />
          <div className={styles.ellipse} />
          <div className={styles["ellipse-2"]} />
          <div className={styles["ellipse-3"]} />
          <div className={styles["rectangle-2"]} />
          <div className={styles["rectangle-3"]} />
          <div className={styles["rectangle-4"]} />
        </div>
      </div>

      <footer className={styles.footer}>
        <div className={styles["background-border"]}>
          <div className={styles.strong}>고객센터 공지사항</div>
          <div className={styles.container}>
            <div className={styles.list}>
              {/* <div className={styles["group-2"]}>
                <div className={styles["text-wrapper-2"]} />
                <img className={styles.icon} alt="Icon" src={icon1} />
              </div>
              <div className={styles["group-3"]}>
                <div className={styles["text-wrapper-2"]} />
                <img className={styles["icon-2"]} alt="Icon" src={icon2} />
              </div>
              <div className={styles["group-4"]}>
                <div className={styles["text-wrapper-3"]} />
                <img className={styles["icon-3"]} alt="Icon" src={icon3} />
              </div>
              <div className={styles["group-5"]}>
                <div className={styles["text-wrapper-2"]} />
                <img className={styles["icon-4"]} alt="Icon" src={icon4} />
              </div>
              <div className={styles["group-6"]}>
                <div className={styles["text-wrapper-2"]} />
                <img className={styles["icon-5"]} alt="Icon" src={icon5} />
              </div>
              <div className={styles["group-7"]}>
                <div className={styles["text-wrapper-2"]} />
                <img className={styles.icon} alt="Icon" src={icon6} />
              </div>
              <div className={styles["group-8"]}>
                <div className={styles["text-wrapper-2"]} />
              </div> */}
            </div>
          </div>
        </div>

        <div className={styles["vertical-border"]}>
          <div className={styles["list-2"]}>
            <div className={styles["item-link"]}>홍길동과의 대화</div>
            <div className={styles["item-link-2"]}>공지사항입니다</div>
            <div className={styles["item-link-3"]}>서비스를 제공하지 않습니다</div>
          </div>
        </div>

        <div className={styles["list-3"]}>
          <div className={styles["div-wrapper-4"]}>몰입캠프소개</div>
          <div className={styles["item-link-4"]}>개인정보처리방침</div>
          <div className={styles["item-link-5"]}>이용약관</div>
          <div className={styles["item-link-6"]}>사이트맵</div>
          <div className={styles["item-link-7"]}>찾아오시는길</div>
        </div>

        <div className={styles.address}>
          <p className={styles["element-IT-L"]}>
            주소 : 대전광역시 유성구 대학로 291 (IT 융합연구소 111호)
          </p>
          <p className={styles["L-dgist-ac"]}>
            개발자 : 대구경북과학기술원 김나혜 이메일: knh2222@dgist.ac.kr
          </p>
          <p>개발자 : 한양대학교 이경규 이메일 : </p>
        </div>
        <img className={styles.image} alt="" src={studymate_logo} />
      </footer>
    </div>
  );
};

export default LectureAllFrame;
