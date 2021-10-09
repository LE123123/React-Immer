/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useRef, useCallback, useState } from 'react';
import produce from 'immer';

const App = () => {
  const nextId = useRef(1);
  const [form, setForm] = useState({ name: '', username: '' });
  const [data, setData] = useState({ array: [], uselessValue: null });

  const onChange = useCallback((event) => {
    const {
      target: { name, value },
    } = event;

    // setForm((prev) => ({
    //   ...prev,
    //   [name]: [value],
    // }));

    /* using immer.js */
    //   setForm(
    //     produce(form, (draft) => {
    //       draft[name] = value;
    //     }),
    //   );

    /* using immer.js + 함수형 업데이트 */
    setForm(
      produce((draft) => {
        draft[name] = value;
      }),
    );
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();

      const info = {
        id: nextId.current,
        name: form.name,
        username: form.username,
      };

      //   setData((prev) => ({
      //     ...prev,
      //     array: [...prev.array, info],
      //   }));

      /* using immer.js */
      //   setData(
      //     produce(data, (draft) => {
      //       draft.array.push(info); // 마치 불변성을 안지키는 것 같으면서 produce로직 안에서 다 불변성을 지키도록 처리 하는 것임.
      //     }),
      //   );

      /* using immer.js + 함수형 업데이트 */
      setData(
        produce((draft) => {
          draft.array.push(info);
        }),
      );

      setForm(() => ({
        name: '',
        username: '',
      }));

      nextId.current += 1;
    },
    [form.name, form.username],
  );

  const onRemove = useCallback((id) => {
    //   setData({
    //     ...data,
    //     array: data.filter((info) => info.id !== id),
    //   });

    /* using immer.js */
    //   setData(
    //     produce(data, (draft) => {
    //       draft.array.splice(
    //         draft.array.findIndex((info) => info.id === id),
    //         1,
    //       );
    //     }),
    //   );

    /* using immer.js + 함수형 업데이트 */
    setData(
      produce((draft) => {
        draft.array.splice(
          draft.array.findIndex((info) => info.id === id),
          1,
        );
      }),
    );
  }, []);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={form.username}
          onChange={onChange}
        />
        <input
          type="text"
          name="name"
          placeholder="이름"
          value={form.name}
          onChange={onChange}
        />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {data.array.map((info) => (
            <li key={info.id} onClick={() => onRemove(info.id)}>
              {info.username}({info.name})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default App;
