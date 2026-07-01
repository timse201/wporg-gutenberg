var el = wp.element.createElement,
	registerBlockType = wp.blocks.registerBlockType,
	InnerBlocks = wp.blockEditor.InnerBlocks,
	useBlockProps = wp.blockEditor.useBlockProps,
	isAdmin = window.location.pathname.includes( 'wp-admin' );

registerBlockType( 'wporg/wporg-gutenberg-link', {
	apiVersion: 3,
	title: 'Demo Link',
	description: 'Create a link for the demo page.',
	icon: 'button',
	category: 'text',

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
				template: [ [ 'core/paragraph' ] ],
				templateLock: 'all',
			} )
		);
	},

	save() {
		return el( 'div', useBlockProps.save(), el( InnerBlocks.Content ) );
	},
} );
