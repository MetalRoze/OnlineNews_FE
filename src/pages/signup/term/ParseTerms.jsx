const parseTerms = (text) => {
    const paragraphs = text.split('\n').filter(paragraph => paragraph.trim() !== '');

    return paragraphs.map((paragraph, index) => {
        const title = paragraph.startsWith('제') ? paragraph : null; 
        const content = !title ? paragraph : null;

        return (
            <div key={index}>
                {title && (
                    <p style={{ color: 'black', margin: '10px', lineHeight: '1.5' }}>
                        {title}
                    </p>
                )}
                {content && (
                    <small style={{ margin: '10px', lineHeight: '1.5' }}>{content}</small> 
                )}
            </div>
        );
    });
};

export default parseTerms; 