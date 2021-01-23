
export const categoryOptions = [
    { value: 'it & software', label: 'It & Software' },
    { value: 'development', label: 'Development' },
    { value: 'marketing', label: 'Marketing' }
]

export const subCategoryOptions = (category) => {
    switch (category) {
        case 'development':
            return [
                { value: 'web development', label: 'web development' },
                { value: 'data science', label: 'Data Science' },
                { value: 'Mobile Development', label: 'Mobile Development' }
            ]; 
        case 'it & software':
            return [
                { value: 'network & security', label: 'Network & Security' },
                { value: 'hardware', label: 'Hardware' },
                { value: 'operating system', label: 'Operating System' }
            ]; 
        case 'marketing':
            return [
                { value: 'digital marketing', label: 'Digital Marketing' },
                { value: 'affiliate marketing', label: 'Affiliate Marketing' },
                { value: 'content marketing', label: 'Content Marketing' }
            ]; 
        case '': 
            return [ { value: '', label: 'Nothing found !' } ];
    }
}

export const tagsOptions = (subCategory) => {
    switch (subCategory.toLowerCase()) {
        //? ============================== Development
        //? ============================== Development
        //? ============================== Development
        
        case 'web development':
            return [
                { value: 'JavaScript', label: 'JavaScript' },
                { value: 'React', label: 'React' },
                { value: 'CSS', label: 'CSS' },
                { value: 'Angular', label: 'Angular' },
                { value: 'PHP', label: 'PHP' },
                { value: '.net', label: '.net' },
                { value: 'Node.js', label: 'Node.js' },
                { value: 'WordPress', label: 'WordPress' },
                { value: 'Laravel', label: 'Laravel' },
                { value: 'Python', label: 'Python' },
              ]; 
              
              case 'data science':
                  return [
                      { value: 'python', label: 'python' },
                      { value: 'machine learning', label: 'machine learning' },
                      { value: 'deep learning', label: 'deep learning' },
                      { value: 'artficial intelligence', label: 'artficial intelligence' },
                { value: 'data Analysis', label: 'data Analysis' },
                { value: 'PHP', label: 'PHP' },
                { value: 'TensorFlow', label: 'TensorFlow' },
            ]; 
        
            case 'mobile development':
                return [
                    { value: 'google flutter', label: 'google flutter' },
                    { value: 'andriod development', label: 'andriod development' },
                    { value: 'ios development', label: 'ios development' },
                    { value: 'swift', label: 'swift' },
                    { value: 'react native', label: 'react native' },
                    { value: 'kotlin', label: 'kotlin' },
                    { value: 'swift ui', label: 'swift ui' },
                ]; 

        //? ============================== It and Software
        //? ============================== It and Software
        //? ============================== It and Software
        
        case 'network & security':
            return [
                { value: 'ethical hacking', label: 'ethical hacking' },
                { value: 'cyber security', label: 'cyber security' },
                { value: 'network security', label: 'network security' },
                { value: 'penetration testing', label: 'penetration testing' },
                { value: 'IT networking fundamentals', label: 'IT networking fundamentals' },
                { value: 'cisco CCNA', label: 'cisco CCNA' },
                { value: 'terraform', label: 'terraform' },
              ]; 
        
        case 'hardware':
            return [
                { value: 'arduino', label: 'arduino' },
                { value: 'PLC', label: 'PLC' },
                { value: 'electronics', label: 'electronics' },
                { value: 'microcontroller', label: 'microcontroller' },
                { value: 'rasberry Pi', label: 'rasberry Pi' },
                { value: 'FPGA', label: 'FPGA' },
                { value: 'embedded systems', label: 'embedded systems' },
                { value: 'HMI', label: 'HMIHTML' },
              ]; 
        
        case 'operating system':
            return [
                { value: 'docker', label: 'docker' },
                { value: 'python', label: 'python' },
                { value: 'algorithm', label: 'algorithm' },
                { value: 'devops', label: 'devops' },
                { value: 'java', label: 'java' },
                { value: 'AWS', label: 'AWS' },
                { value: 'kubernetes', label: 'kubernetes' },
                { value: 'ansible', label: 'ansible' },
            ]; 
        
        //? ============================== Marketing
        //? ============================== Marketing
        //? ============================== Marketing

        case 'digital marketing':
            return [
                { value: 'google Ads', label: 'google Ads' },
                { value: 'social media marketing', label: 'social media marketing' },
                { value: 'google ads', label: 'google ads' },
                { value: 'markteting strategy', label: 'markteting strategy' },
                { value: 'internet marketing', label: 'internet marketing' },
                { value: 'youtube marketing', label: 'youtube marketing' },
                { value: 'retargeting', label: 'retargeting' },
            ]; 
        
        case 'content marketing':
            return [
                { value: 'copywriting', label: 'copywriting' },
                { value: 'blogging', label: 'blogging' },
                { value: 'writting', label: 'writting' },
                { value: 'content writing', label: 'content writing' },
                { value: 'wordpress', label: 'wordpress' },
                { value: 'storytelling', label: 'storytelling' },
            ]; 
        
        case 'affiliate marketing':
            return [
                { value: 'clickBank', label: 'clickBank' },
                { value: 'SEO', label: 'SEO' },
                { value: 'amazon', label: 'amazon' },
                { value: 'affiliate marketing', label: 'affiliate marketing' },
                { value: 'CPA marketing', label: 'CPA marketing' },
                { value: 'teespring', label: 'teespring' },
                { value: 'online business', label: 'online business' },
            ]; 
        
        case '': 
            return [ { value: '', label: 'Nothing found !' } ];
    }
}