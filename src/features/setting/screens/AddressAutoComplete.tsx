import React, { useState } from "react";
import { Form, Select } from "antd";

import mockAddress from "./new_data.json";
const { Option } = Select;

interface props {
  name: string[];
}

type AddressDatabase = Province[];

interface Province extends AddressBase {
  1: Amphoe[];
}

interface Amphoe extends AddressBase {
  1: Tambon[];
}

interface Tambon extends AddressBase {
  1: ZipCode[];
}

type ZipCode = number;

interface AddressBase {
  0: string;
}

const MockAddress: AddressDatabase = mockAddress as unknown as AddressDatabase;

const AddressAutoComplete: React.FunctionComponent<props> = (props) => {
  const p1 = MockAddress[0]; // จังหวัดที่ 0 => ["กระบี่",[array of amphoe]]
  const p2 = MockAddress[1]; // จังหวัดที่ 1 => ["กรุงเทพมหานคร",[array of amphoe]]
  const a1 = MockAddress[0][1][0]; // ["คลองท่อม", Array(7)]
  const a2 = MockAddress[0][1][1]; // ["ปลายพระยา", Array(4)]
  const t01 = MockAddress[0][1][0][1];
  const t02 = MockAddress[0][1][1][1];
  const t03 = MockAddress[0][1][2][1];
  const t04 = MockAddress[0][1][3][1];
  const t05 = MockAddress[0][1][4][1];
  const t06 = MockAddress[0][1][5][1];
  const t07 = MockAddress[0][1][6][1];
  const t08 = MockAddress[0][1][7][1];

  // console.log("t01", t01)
  // console.log("t02", t02)
  // console.log("t03", t03)
  // console.log("t04", t04)
  // console.log("t05", t05)
  // console.log("t06", t06)
  // console.log("t07", t07)
  // console.log("t08", t08)

  const { name } = props;
  const [province, setProvince] = useState(0); // ต้องเก็บ Index ไว้
  const [amphoe, setAmphoe] = useState(0);
  const [tambon, setTambon] = useState(0);
  const [zipcode, setZipcode] = useState(0);

  function handleOnSelectProvince(value: any, options: any) {
    setProvince(options.key);
  }

  function handleOnSelectAmphoe(value: any, options: any) {
    setAmphoe(options.key);
  }

  function handleOnSelectTambon(value: any, options: any) {
    setTambon(options.key);
  }

  function handleOnSelectZipcode(value: any, options: any) {
    setZipcode(options.key);
  }

  // ไม่รู้จังหว่ะไหนใช้ onChange มันแสงดผลคล้าย onSelect เลยอ่า
  // function handleOnChangeProvince(province: any) {
  //   setProvince(province)
  //   console.log("handleOnChangeProvince", province)
  // }

  return (
    <Form.Item name={name}>
      <Select
        onSelect={handleOnSelectProvince}
        showSearch
        allowClear={true}
        style={{ width: "100%" }}
        placeholder="Please select province | กรุณาเลือกจังหวัด"
      >
        {MockAddress.map((province, index: number) => (
          <Option key={index} value={province[0]}>
            {province[0]}
          </Option>
        ))}
      </Select>
      <div style={{ margin: "40px 0" }} />
      <Select
        onSelect={handleOnSelectAmphoe}
        showSearch
        allowClear={true}
        style={{ width: "100%" }}
        placeholder="Please select amphoe | กรุณาเลือกเขต หรือ อำเภอ"
      >
        {MockAddress[province][1].map((amphoe, index: number) => (
          <Option key={index} value={amphoe[0]}>
            {amphoe[0]}
          </Option>
        ))}
      </Select>
      <div style={{ margin: "40px 0" }} />
      <Select
        onSelect={handleOnSelectTambon}
        showSearch
        allowClear={true}
        style={{ width: "100%" }}
        placeholder="Please select tambon | กรุณาเลือกแขวง หรือ ตำบล"
      >
        {MockAddress[province][1][amphoe][1].map((tambon, index: number) => (
          <Option key={index} value={tambon[0]}>
            {tambon[0]}
          </Option>
        ))}
      </Select>
      <div style={{ margin: "40px 0" }} />
      <Select
        onSelect={handleOnSelectZipcode}
        showSearch
        allowClear={true}
        style={{ width: "100%" }}
        placeholder="Please select zipcode | กรุณาเลือกรหัสไปรษณีย์"
      >
        {MockAddress[province][1][amphoe][1][tambon][1].map(
          (zipcode, index: number) => (
            <Option key={index} value={zipcode}>
              {zipcode}
            </Option>
          )
        )}
      </Select>
    </Form.Item>
  );
};

export default AddressAutoComplete;
