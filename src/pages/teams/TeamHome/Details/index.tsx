import { ProDivider } from '@/common';
import React from 'react';
import { useState } from 'react';
import {
  LeftOutlined,
  RightOutlined,
  HighlightOutlined,
  PicRightOutlined,
  EditOutlined,
  DownOutlined,
} from '@ant-design/icons';
import { Col, Row, Button, Dropdown, Menu, Progress } from 'antd';
import './index.less';

const TeamDetails = (props: any) => {
  const [id] = useState<string>(props?.match?.params?.id);
  return (
    <Row>
      <Col span={24}>
        <p className="backTeam_wraps">
          <LeftOutlined /> Back to Team
        </p>
      </Col>
      <Col span={24} className="WeekTeamwraps">
        <Button className="Teambtns">
          <LeftOutlined />
        </Button>
        <Button className="Teambtns">
          <RightOutlined />
        </Button>
        <p>
          <strong>Week</strong>: 24 – 30 May 2021
        </p>
        <span className="ReturnHome_wraps">
          <a href="">Return to This Week</a>
        </span>
      </Col>
      <ProDivider></ProDivider>
      <Col span={18} className="Team_textblow_Wraps">
        <div className="noteWraps">
          <div className="icons_wraps">
            <PicRightOutlined />
          </div>
          <div className="Team_UserName_Wraps">[SAMPLE] Tamara Timekeeper</div>
          <span className="adminnote_wraps">Admin</span>
          <p>Sample Role</p>
          <p>tamara@harvestsample.com</p>
        </div>
      </Col>
      <Col span={6} className="TeamEdit_Wraps">
        <Button className="TeamEditsWraps_btns">
          <HighlightOutlined /> Edit Profile
        </Button>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="1">Pin</Menu.Item>
              <Menu.Item key="2">Archive</Menu.Item>
              <Menu.Item key="3" disabled>
                Delete
              </Menu.Item>
            </Menu>
          }
        >
          <Button className="TeamEditsWraps_btns">
            Action <DownOutlined />
          </Button>
        </Dropdown>
      </Col>
      <Col span={6} className="SlideColors_Wraps">
        <div className="Teambox1_Wrpas">
          <div className="HrsCapFir_wraps">
            <div className="head">Total Hourse</div>
            <div className="timetake">30.63</div>
          </div>
          <div className="HrsCapSec_wraps">
            <div className="head">Capacity</div>
            <div className="timetake">35.00</div>
          </div>
          <div className="Progress_Wraps">
            <Progress percent={60} success={{ percent: 30 }} />
          </div>
          <div className="Teammulticolrwraps">
            <div className="b1">
              <div className="Colorsbluewraps"></div>
              <span>Billable</span>
            </div>
            <p>19.03</p>
            <div className="b2">
              <div className="Colorslightwraps"></div>
              <span>Non-Billable</span>
            </div>
            <p>11.60</p>
          </div>
        </div>
        <div className="Teambox2_Wrpas">
          <div className="TeamDays">
            <p>Mon</p>
            <p>
              <strong>5.90</strong>
            </p>
          </div>
          <div className="TeamDays">
            <p>Tue</p>
            <p>
              <strong>6.12</strong>
            </p>
          </div>
          <div className="TeamDays">
            <p>Wed</p>
            <p>
              <strong>4.63</strong>
            </p>
          </div>
          <div className="TeamDays">
            <p>Thu</p>
            <p>
              <strong>7.42</strong>
            </p>
          </div>
          <div className="TeamDays">
            <p>Fri</p>
            <p>
              <strong>6.56</strong>
            </p>
          </div>
          <div className="TeamDays">
            <p>Sat</p>
            <p>
              <strong>0.00</strong>
            </p>
          </div>
          <div className="TeamDays">
            <p>Sun</p>
            <p>
              <strong>0.00</strong>
            </p>
          </div>
        </div>
        <div className="Teambox3_Wrpas">
          <div className="Teambox_head">
            <p> Projects Breakdown</p>
          </div>
          <div className="Progress_Wraps">
            <Progress percent={60} success={{ percent: 30 }} />
          </div>
          <div className="Teambox3_trilColors_Wrpas">
            <div className="b1">
              <div className="Colorsgreen_Wraps"></div>
              <span>[SAMPLE] Time & Materials Project</span>
            </div>
            <p>12.39</p>
            <div className="b2">
              <div className="Colorsorange_Wraps"></div>
              <span>[SAMPLE] Monthly Retainer</span>
            </div>
            <p>9.06</p>
            <div className="b3">
              <div className="Colorspink_Wraps"></div>
              <span>[SAMPLE] Fixed Fee Project</span>
            </div>
            <p>6.07</p>
            <div className="b4">
              <div className="Colorsperpple_Wraps"></div>
              <span>[SAMPLE] Non-Billable Project</span>
            </div>
            <p>3.11</p>
          </div>
        </div>
        <div className="Teambox4_Wrpas">
          <div className="Teambox_head">
            <p> Tasks Breakdown</p>
          </div>
          <div className="Progress_Wraps">
            <Progress percent={60} success={{ percent: 30 }} />
          </div>
          <div className="Teambox4_trilColors_Wrpas">
            <div className="b1">
              <div className="Colorsgreen_Wraps"></div>
              <span>Project Management</span>
            </div>
            <p>12.39</p>
            <div className="b2">
              <div className="Colorsorange_Wraps"></div>
              <span>Business Development</span>
            </div>
            <p>10.19</p>
            <div className="b3">
              <div className="Colorspink_Wraps"></div>
              <span>Marketing</span>
            </div>
            <p>9.57</p>
          </div>
        </div>
      </Col>
      <Col span={18} className="TeamTable_Wraps">
        <div className="TeamTable_HeadTitile_Wraps">
          <p>
            <strong> Monday</strong>
          </p>
          <span>24 May</span>
        </div>
        <div className="TeamTable_ContainerWraps">
          <div className="Teamtable_Contentbase_Wraps">
            <div className="TeamTable_datafoucs_Wraps">
              <p>
                <strong>[SAMPLE] Non-Billable Project</strong>
                ([SAMPLE] Client A)
              </p>
              <p>Marketing – This is a sample time entry.</p>
            </div>
            <div className="TimeTable_Timeicons_wraps">
              <p>
                <strong>0.74</strong>
              </p>
              <Button className="IconClick_Btns">
                <EditOutlined />
              </Button>
            </div>
          </div>
          <p className="TeamTable_TotalCount_wraps">
            Total: <strong>5.90</strong>
          </p>
        </div>
      </Col>
    </Row>
  );
};

export default TeamDetails;
