import React, { ReactNode } from 'react';


function CPComboBox(props: any): ReactNode {
    return (
        <div>
            <input type="text" placeholder='검색어를 넣어주세요.' value="상태값" />
            <input type="text" readOnly placeholder='검색어를 넣어주세요.' value="상태값" />
        </div>
    )
}


export default CPComboBox;