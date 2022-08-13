import styles from '../css/Tooltip.module.css';
import React, {useState} from 'react';
import OutsideClickHandler from './OutsideClickHandler';
import {useColorMode} from '@docusaurus/theme-common';

export default function Tooltip({children, title, mode = 'hover'}) {
	const [visible, setVisible] = useState(false);
	const {colorMode} = useColorMode();
	return (
		<OutsideClickHandler onClickOutside={() => setVisible(false)}>
			<span className={`${styles.container} ${mode === 'hover' ? styles.containerHover : ''}`}>
				<span onClick={() => setVisible(!visible)} className={styles.children}>
					{children}
				</span>
				<span
					className={styles.popup}
					style={{
						display: mode === 'click' && visible ? 'block' : 'none',
					}}>
					<span
						className={styles.popupText}
						style={{
							backgroundColor: colorMode === 'dark' ? '#dadae0' : '#2f3136',
							color: colorMode === 'dark' ? '#000' : '#fff',
						}}>
						{title}
					</span>
					<span
						className={styles.popupTriangle}
						style={{borderTopColor: colorMode === 'dark' ? '#dadae0' : '#2f3136'}}
					/>
				</span>
			</span>
		</OutsideClickHandler>
	);
}
