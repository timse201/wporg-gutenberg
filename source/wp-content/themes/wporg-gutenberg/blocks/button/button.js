var el = wp.element.createElement,
	registerBlockType = wp.blocks.registerBlockType,
	InnerBlocks = wp.blockEditor.InnerBlocks,
	useBlockProps = wp.blockEditor.useBlockProps,
	isAdmin = window.location.pathname.includes( 'wp-admin' );

registerBlockType( 'wporg/wporg-gutenberg-button', {
	apiVersion: 3,
	title: 'Demo Button',
	icon: 'button',
	category: 'layout',

	attributes: {
		url: {
			source: 'attribute',
			selector: 'a',
			attribute: 'href',
		},
		title: {
			source: 'attribute',
			selector: 'a',
			attribute: 'title',
		},
		text: {
			source: 'text',
			selector: 'a',
		},
	},

	supports: {
		inserter: isAdmin,
	},

	edit( props ) {
		const blockProps = useBlockProps();

		if ( ! isAdmin ) {
			const blockEditorData = wp.data.select( 'core/block-editor' );
			const innerHtml = blockEditorData.getBlock( props.clientId ).innerBlocks[ 0 ].originalContent;

			return el( 'div', {
				...blockProps,
				dangerouslySetInnerHTML: { __html: innerHtml },
			} );
		}
		return el(
			'div',
			blockProps,
			el( InnerBlocks, {
				template: [ [ 'core/button' ] ],
				templateLock: 'all',
			} )
		);
	},

	save() {
		return el(
			'div',
			useBlockProps.save( { className: 'wp-block-buttons' } ),
			el( InnerBlocks.Content )
		);
	},
} );
